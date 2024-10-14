<x-app-layout>
    <br>
    <br>
    <div class="row">

        <div class="col-sm-2 col-xl-2 col-md-2"></div>
        <div class="col-sm-8 col-xl-8 col-md-8">
            <!-- Table Start -->
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-secondary rounded h-100 p-4">
                            <header>
                                <div role="alert" class="alert relative border rounded-md px-5 py-4 bg-pending border-pending text-white dark:border-pending mb-2 text-center" style="box-shadow: black 2px 2px 2px;">
                                    <h1>
                                        User List
                                    </h1>
                                </div>
                            </header>
                            <br>
                            <br>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($users as $user)
                                    @if ($user->role !=="public")
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>
                                            <a href="{{route('admin.editusers', ['id' => $user->id])}}" class="btn btn-info">Edit</a>
                                        </td>
                                        <td>
                                            <a href="{{route('admin.users.destroy', ['id' => $user->id])}}" class="btn btn-primary">Delete</a>
                                        </td>
                                    </tr>
                                    @endif
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Table End -->
        </div>
        <div class="col-sm-2 col-xl-2 col-md-2"></div>
    </div>

    <br>
    <br>

</x-app-layout>