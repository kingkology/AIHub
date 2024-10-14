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
                            Email Classification
                        </h1>
                    </div>
                </header>
                <br>
                <br>
                <form action="{{ route('upload') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <input type="file" name="emaildata" required>
                    <button type="submit" class="btn btn-primary">Upload</button>
                </form>
            </div>
        </div>
        <div class="col-sm-2 col-xl-2 col-md-2"></div>

    </div>

   
</x-app-layout>