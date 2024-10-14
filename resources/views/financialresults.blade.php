<x-app-layout>
    <br>
    <br>
    <div class="row">
        <div class="col-sm-1 col-xl-1 col-md-1"></div>
        <div class="col-sm-10 col-xl-10 col-md-10">
            <div class="bg-secondary rounded h-100 p-4">
            <header>
                    <div role="alert" class="alert relative border rounded-md px-5 py-4 bg-pending border-pending text-white dark:border-pending mb-2 text-center" style="box-shadow: black 2px 2px 2px;">
                        <h1>
                            Analysis Results
                        </h1>
                    </div>
                </header>
                <br>
                <br>
                
                <div>
                    {{$analysis}}
                </div>

            </div>
        </div>
        <div class="col-sm-1 col-xl-1 col-md-1"></div>

    </div>
</x-app-layout>