<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Smalot\PdfParser\Parser;
use OpenAI;
use GuzzleHttp\Client;

class FinancialAnalysisController extends Controller
{

    private $assistant_id;
    private $openai_key;
    private $thread_id;
    private $text;

    public function __construct()
    {
        $this->assistant_id = env('FINANCIAL_ASSISTANT');
        $this->openai_key = env('OPENAI_API_KEY');
    }

    public function index()
    {
        session()->pull('financial_thread_id', 'default');
        return view('financialanalyst');
    }

    public function analyse(Request $request)
    {
        if (!session()->has('financial_thread_id')) {
            $request->validate([
                'transactionfile' => ['required', 'mimes:pdf', 'max:2048'],
                'comments' => ['required', 'string'],
            ]);

            $file = $request->file('transactionfile');
            $parser = new Parser();
            $pdf = $parser->parseFile($file->getPathname());

            $this->text = 'financial transactions: /n'.$pdf->getText().'/nLoan conditions: /n'.$request->comments;
        } else {
            $request->validate([
                'transactionfile' => ['sometimes', 'mimes:pdf', 'max:2048'],
                'comments' => ['required', 'string'],
            ]);
            
            if ($request->file('transactionfile')) {
                $file = $request->file('transactionfile');
                $parser = new Parser();
                $pdf = $parser->parseFile($file->getPathname());

                $this->text = 'financial transactions: /n'.$pdf->getText().'/nLoan conditions: /n'.$request->comments;
            }
            else
            {
                $this->text = 'Loan conditions: /n'.$request->comments;
            }

            
        }

        

        $client = new Client();
        
        // Create new thread and add message
        $this->generateResponse($this->text, $client);
        // Run Assistant
        $reply = $this->runAssistant($client);
        
        return response()->json(['reply' => $reply]);

    }

    // Create thread and add message
    private function generateResponse($comment, $client)
    {

        if(session()->get('financial_thread_id'))
        {
            $this->thread_id = session()->get('thread_id');
        }
        else
        {
            // Create new thread
            $response = $client->post('https://api.openai.com/v1/threads', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $this->openai_key,
                    'OpenAI-Beta' => 'assistants=v2',
                ],
                'json' => [],
            ]);

            $thread = json_decode($response->getBody()->getContents(), true);
            $this->thread_id = $thread['id'];
            session()->put('financial_thread_id', $this->thread_id);
        }

        // Add message to thread
        $response = $client->post('https://api.openai.com/v1/threads/' . $this->thread_id . '/messages', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->openai_key,
                'OpenAI-Beta' => 'assistants=v2',
            ],
            'json' => [
                'role' => 'user',
                'content' => $comment,
            ],
        ]);
    }

    private function runAssistant($client)
    {

        // Run the assistant
        $response = $client->post('https://api.openai.com/v1/threads/'. $this->thread_id.'/runs', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->openai_key,
                'OpenAI-Beta' => 'assistants=v2',
            ],
            'json' => [
                'assistant_id' => $this->assistant_id,
            ],
        ]);

        $run = json_decode($response->getBody()->getContents(), true);

        // Wait for completion
        while ($run['status'] != "completed") {
            usleep(500000); // sleep for 0.5 seconds
            $response = $client->get('https://api.openai.com/v1/threads/' . $this->thread_id . '/runs/' . $run['id'], [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $this->openai_key,
                    'OpenAI-Beta' => 'assistants=v2',
                ],
            ]);

            $run = json_decode($response->getBody()->getContents(), true);
        }

        // Retrieve the message
        $response = $client->get('https://api.openai.com/v1/threads/' . $this->thread_id . '/messages', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->openai_key,
                'OpenAI-Beta' => 'assistants=v2',
            ],
        ]);

        $messages = json_decode($response->getBody()->getContents(), true);
        $newMessage = $messages['data'][0]['content'][0]['text']['value'];

        return $newMessage;
    }

    private function analyzeData($text,$comments)
    {
        $client = OpenAI::client(env('OPENAI_API_KEY'));

        $system_prompt = 'Perform the following analysis on the provided financial transaction data and Provide only your conclusion on the users loan eligibility based on the analysis and the loan conditions attached. With your reasoning. Dont add the steps you went through and be specific do not speculate or suggest any other actions. Make your decisions based on the data you have and conclude with reasons. Make sure to add figures from your analysis to back your reasoning.:

                Perform Data Analysis:

                Step 1: Overall Sum by Transaction Type

                Calculate the total sum, count, and average of transactions for each transaction type.
                Key terms to identify transaction types: "Credit", "Debit", "Transfer", "Withdrawal", "Deposit".
                Step 2: Sum by Month and Transaction Type

                Organize transactions by month and transaction type.
                Calculate monthly totals for each transaction type.
                Use the formula:
                [
                \text{Monthly Total} = \sum \text{(Amount for each transaction type in the month)}
                ]
                Step 3: Average by Month and Transaction Type

                Compute the average transaction amount for each transaction type by month.
                Use the formula:
                [
                \text{Monthly Average} = \frac{\text{Monthly Total}}{\text{Number of Transactions}}
                ]
                Step 4: Number of Transactions by Type

                Count the number of transactions for each type by month.
                Step 5: Average Balance per Month

                Calculate the average balance at the end of each month.
                Use the formula:
                [
                \text{Average Balance} = \frac{\sum \text{(Balance after each transaction)}}{\text{Number of Transactions}}
                ]
                Step 6: Transfers Analysis

                Analyze transfers sent by the customer to others and received by the customer from others.
                Key terms for transfers: "TRANSFER", "SEND", "RECEIVE".
                Step 7: Profit Analysis

                Calculate total deposits and withdrawals.
                Determine monthly profit as:
                [
                \text{Profit} = (\text{Total Deposits} - \text{Total Withdrawals}) + \text{Average Balance}
                ]
                Compute inflow less outflow as:
                [
                \text{Inflow Less Outflow} = \text{Total Deposits} - \text{Total Withdrawals}
                ]
                Step 8: Expense Analysis

                Analyze total withdrawals by transaction type.
                Group expenses based on the recipient and reference.
                Key terms for expenses: "Electricity", "Water", "Insurance", "Savings", "Airtime", "Gambling", "Rent", "Business".
                Step 9: Loan Payments

                Identify and summarize loan payments by recipient and reference.
                Calculate total loan repayment amounts.
                Key terms: "Loan", "Credit", "Repayment", "Microfinance", "Savings".
                Step 10: Group Expenses Analysis

                Group expenses by categories such as electricity, water, insurance, savings, airtime, gambling, rent, and business activities.
                Key terms for gambling: "KGL", "NLA", "Betway", "Sportybet", "Mybet", "1xbet", "Betwinner", "Bet365", "Mozzartbet", "Betika", "1957bet", "Soccabet", "Melbet".
                Step 11: Risk Factors Analysis

                Evaluate risk factors based on transaction averages and their percentages of total expenses.
                Consider factors like loan repayment, rent, business activities, and gambling.
                Use the formula for percentage:
                [
                \text{Percentage of Expenses} = \left(\frac{\text{Specific Expense}}{\text{Total Expenses}}\right) \times 100
                ]
                Step 12: Income Determination

                Calculate monthly net income based on profits.
                Estimate gross monthly income from profit margins.
                Determine minimum inflow and outflow.
                Step 13: Loan Eligibility Analysis

                Determine if the user is eligible for the specified loan amount.
                Assess the users ability to repay the loan within the specified period based on their net income and financial stability.
                Calculate the monthly repayment amount and compare it to the users average monthly profit and inflow.
                Use the formula:
                [
                \text{Monthly Repayment} = \frac{\text{Loan Amount}}{\text{Repayment Period (Months)}}
                ]
                Determine eligibility by checking if the monthly repayment is less than or equal to a reasonable percentage (e.g., 30%) of the users net income.
                Step 14: Apply Financial Adjustments

                Identify necessary financial adjustments (haircuts) based on risk factors.
                Calculate and apply haircuts to determine the final amount available.
                ';

        $user_prompt = '
        \n
        loan conditions:
        \n'.$comments.'
        Transaction data:
        \n' . $text;
        

        $response = $client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $system_prompt
                ],
                [
                    'role' => 'user',
                    'content' => $user_prompt,
                ]
            ],
            'max_tokens' => 1500,
        ]);

        return trim($response['choices'][0]['message']['content']);
    }
}
