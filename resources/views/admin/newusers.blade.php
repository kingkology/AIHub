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
                            Add New User
                        </h1>
                    </div>
                </header>
                <br>
                <br>
                <form method="POST" action="{{ route('admin.users.store') }}" id="add_user" enctype="multipart/form-data">
                    @csrf
                    @method('post')
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" :value="old('name')" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" :value="old('email')" aria-describedby="emailHelp" required>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>

                    <button class="btn btn-primary">Add User</button>
                </form>
            </div>
        </div>
        <div class="col-sm-2 col-xl-2 col-md-2"></div>

    </div>

</x-app-layout>