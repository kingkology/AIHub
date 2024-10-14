<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use OpenAI;

class EmailController extends Controller
{

    public function showUploadForm()
    {
        return view('upload');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'emaildata' => 'required|mimes:xlsx,xls'
        ]);

        $filePath = $request->file('emaildata')->getRealPath();
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();

        $emails = [];
        foreach ($worksheet->getRowIterator() as $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false);

            $emailData = [];
            foreach ($cellIterator as $cell) {
                $emailData[] = $cell->getValue();
            }

            if (!empty($emailData[0])) { // Assuming the first column is email_id
                $emails[] = [
                    'email_id' => $emailData[0],
                    'subject' => $emailData[1] ?? '',
                    'message' => $emailData[2] ?? '',
                ];
            }
        }

        $classifiedEmails = $this->classifyEmails($emails);

        return view('results', ['emails' => $classifiedEmails]);
    }

    private function classifyEmails(array $emails)
    {
        // Initialize the OpenAI client with your API key
        $client = OpenAI::client(env('OPENAI_API_KEY'));

        foreach ($emails as &$email) {
            $response = $client->chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant.'
                    ],
                    [
                        'role' => 'user',
                        'content' => "Classify the following email as 'product inquiry' or 'order request'. Note that any email that has the term buy in it is an order request. Return only the category or 'Unknown' if no category is found:\n\nSubject: {$email['subject']}\nMessage: {$email['message']}"
                    ]
                ],
                'max_tokens' => 10,
            ]);

            $email['category'] = trim($response['choices'][0]['message']['content']);
        }

        return $emails;
    }

}
