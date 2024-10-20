<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HealthcareController extends Controller
{
    private $assistant_id;
    private $openai_key;
    private $thread_id;

    public function __construct()
    {
        $this->assistant_id = env('HEALTHCARE_ASSISTANT');
        $this->openai_key = env('OPENAI_API_KEY');
    }

    public function index()
    {
        session()->pull('health_thread_id', 'default');
        return view('healthcare');
    }

    public function chat(Request $request)
    {
        $client = new Client();
        
        // Create new thread and add message
        $this->generateResponse($request->input('message'), $client);
        // Run Assistant
        $reply = $this->runAssistant($client);
        
        return response()->json(['reply' => $reply]);
    }

    // Create thread and add message
    private function generateResponse($messageBody, $client)
    {

        if(session()->has('health_thread_id'))
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
            session()->put('health_thread_id', $this->thread_id);
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
                'content' => $messageBody,
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
}
