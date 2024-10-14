<x-app-layout>
    <br>
    <br>
    <header>
        <div role="alert" class="alert relative border rounded-md px-5 py-4 bg-pending border-pending text-white dark:border-pending mb-2 text-center" style="box-shadow: black 2px 2px 2px;">
            <h1>
                Loan Analyst
            </h1>
        </div>
    </header>
    <div class="row">
        <div class="col-sm-1 col-xl-1 col-md-1"></div>
        <div class="col-sm-10 col-xl-10 col-md-10">
                
                <div id="chatbox" class="bg-secondary rounded h-100 p-4" style="width: 100%;height: 400px;border: 1px solid #ccc;padding: 10px;overflow-y: scroll;">
                    
                </div>
            <br>
            <form id="finance_data">

                <div class="mb-3">
                    <label for="transactionfile" class="form-label">Transaction File (PDF)</label>
                    <input type="file" class="form-control" id="transactionfile" name="transactionfile" accept="pdf">
                </div>

                <div class="mb-3">
                    <label for="comments" class="form-label">Loan Conditions</label>
                    <textarea id="comments" name="comments" class="form-control bg-white" placeholder="Provide loan terms..." style="height: 50px;" required>

                            </textarea>
                </div>
            </form>
            <br>
            <button onclick="sendMessage()" class="btn btn-primary">Send</button>
        </div>
        <div class="col-sm-1 col-xl-1 col-md-1"></div>

    </div>

    <script>
        function sendMessage() {
    const form_id = "finance_data";
    let current_name = "";
    let current_id = "";
    let check_required_pass = true;
    var form = $('#' + form_id);
    var the_data = [];
    the_data = form.serializeArray();

    let form_data = new FormData();

    var output = [];

    the_data.forEach(function (item) {
        current_name = item.name;
        var existing = output.filter(function (v, i) {
            return v.name == item.name;
        });
        if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].value = output[existingIndex].value.concat(item.value);
        } else {
            if (typeof item.value == 'string') {
                item.value = [item.value];
                if (item.value != "undefined") {
                    let current_element = document.getElementsByName(current_name);
                    current_id = $(current_element).attr("id");

                    switch (true) {
                        case (($('#' + current_id).val() == "") && ($('#' + current_id).prop('required'))):
                            if ((item.value)) {
                                let thefield = current_name.replaceAll('_', ' ');
                                notif({
                                    // heading: 'Required',
                                    msg: thefield + ' is required',
                                    type: 'error',
                                    position: 'right'
                                });
                                check_required_pass = false;
                            }
                            break;

                        default:
                            break;
                    }
                    form_data.append(current_name, item.value);
                }
            }
        }
    });

    let inputs = document.getElementById(form_id);
    for (var i = 0; i < inputs.elements.length; i++) {
        if (inputs.elements[i].type.toLowerCase() == 'file') {
            if (inputs.elements[i].name) {
                switch (true) {
                    case (inputs.elements[i].files.length > 0):
                        let thefile;
                        thefile = document.forms[form_id][inputs.elements[i].name].files[0];
                        form_data.append(inputs.elements[i].name, thefile);
                        break;

                    default:
                        let current_element = document.getElementsByName(inputs.elements[i].name);
                        current_id = $(current_element).attr("id");
                        if ($('#' + current_id).prop('required')) {
                            let thefield = inputs.elements[i].name.replaceAll('_', ' ');
                            notif({
                                // heading: 'Required',
                                msg: thefield + ' is required',
                                type: 'error',
                                position: 'right'
                            });
                            check_required_pass = false;
                        }
                        break;
                }
            }
        }
    }

    if (check_required_pass) {
        const userInput = document.getElementById('comments').value;
        fetch('/financialanalyst', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: form_data
            })
            .then(response => response.json())
            .then(data => {
                const chatbox = document.getElementById('chatbox');
                chatbox.innerHTML += `<div class="d-flex align-items-center justify-content-between mb-2"><div class="d-flex align-items-center border-bottom py-3"><img class="rounded-circle flex-shrink-0" src="{{ asset('admin_assets/img/user.jpg') }}" alt="" style="width: 40px; height: 40px;"><div class="w-100 ms-3"><div class="d-flex w-100 justify-content-between"><h6 class="mb-0">User</h6></div><span>Transaction file and loan conditions</span></div></div></div>`;
                chatbox.innerHTML += `<div class="d-flex align-items-center justify-content-between mb-2"><div class="d-flex align-items-center border-bottom py-3"><img class="rounded-circle flex-shrink-0" src="{{ asset('admin_assets/img/ai.png') }}" alt="" style="width: 40px; height: 40px;"><div class="w-100 ms-3"><div class="d-flex w-100 justify-content-between"><h6 class="mb-0">AI</h6></div><span>${data.reply}</span></div></div></div>`;
                document.getElementById('transactionfile').value = '';
                document.getElementById('comments').value = '';
                chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
            });
    }
}
    </script>

</x-app-layout>

