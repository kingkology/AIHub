<x-app-layout>
    <br>
    <br>
    <header>
        <div role="alert" class="alert relative border rounded-md px-5 py-4 bg-pending border-pending text-white dark:border-pending mb-2 text-center" style="box-shadow: black 2px 2px 2px;">
            <h1>
                Healthcare Chatbot
            </h1>
        </div>
    </header>
    <div class="row">
        <div class="col-sm-1 col-xl-1 col-md-1"></div>
        <div class="col-sm-10 col-xl-10 col-md-10">
            <div id="chatbox" class="bg-secondary rounded h-100 p-4" style="width: 100%;height: 400px;border: 1px solid #ccc;padding: 10px;overflow-y: scroll;">

            </div>
            <br>
            <textarea id="userInput" class="form-control bg-white" placeholder="Describe your symptoms..." style="height: 120px;">
            1. Please describe each symptom you are experiencing, such as pain, fever, nausea, changes in appetite, etc. 
            2. How long have you been experiencing these symptoms? 
            3. Have you traveled recently, especially to areas where malaria is common? 
            4. Have you engaged in any behaviors that might put you at risk for gonorrhea or ulcers? 
            5. Any additional information you think might be important (like medications you're taking or health conditions)
            </textarea>
            <br>
            <button onclick="sendMessage()" class="btn btn-primary">Send</button>
        </div>
        <div class="col-sm-1 col-xl-1 col-md-1"></div>

    </div>

    <script>
        function sendMessage() {
            const userInput = document.getElementById('userInput').value;
            fetch('/healthcare/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        message: userInput
                    })
                })
                .then(response => response.json())
                .then(data => {
                    const chatbox = document.getElementById('chatbox');
                    chatbox.innerHTML += `<br><div class="w-100 ms-3"><div class="d-flex w-100 justify-content-between"><h6 class="mb-0">User</h6></div><span>${userInput}</span></div></p>`;
                    chatbox.innerHTML += `<div class="w-100 ms-3"><div class="d-flex w-100 justify-content-between"><h6 class="mb-0">AI</h6></div><span>${data.reply}</span></div>`;
                    document.getElementById('userInput').value = '';
                    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
                });
        }
    </script>

</x-app-layout>