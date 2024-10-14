<x-app-layout>
    <br>
    <br>
    <div class="row">
        <div class="col-sm-2 col-xl-2 col-md-2"></div>
        <div class="col-sm-8 col-xl-8 col-md-8">
            <div class="bg-secondary rounded h-100 p-4">
                <header>
                    <div role="alert" class="alert relative border rounded-md px-5 py-4 bg-pending border-pending text-white dark:border-pending mb-2 text-center" style="box-shadow: black 2px 2px 2px;">
                        <h1>
                            Financial Analyst
                        </h1>
                    </div>
                </header>
                <br>
                <br>
                <form action="{{ route('analyse') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="transactionfile" class="form-label">Transaction File (PDF)</label>
                        <input type="file" class="form-control" id="transactionfile" name="transactionfile" accept="pdf" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="comments" class="form-label">Loan Conditions</label>
                        <textarea id="comments" name="comments" class="form-control bg-white" placeholder="Provide loan terms..." style="height: 50px;" required>
            
                        </textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Process</button>
                </form>
            </div>
        </div>
        <div class="col-sm-2 col-xl-2 col-md-2"></div>

    </div>

   
</x-app-layout>