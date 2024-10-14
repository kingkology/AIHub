<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('admin.users', compact('users'));
    }

    public function new_user()
    {
        $page = '/admin/newusers'; 
        session(['page' => $page]);
        return view('admin.newusers');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|',
            // 'user_type' => 'required|string|in:admin,user',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'admin',
        ]);

        return redirect()->route('admin.newusers')->with('success', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('admin.editusers', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'user_type' => 'sometimes|string|in:admin,user',
        ]);

        $user->update($request->only('name', 'email'));

        if (isset($validated['user_type'])) {
            $user->password = $validated['user_type'];
            $user->save();
        }

        return redirect()->route('admin.editusers', ['id' => $user->id])->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $userToDelete = User::findOrFail($id);
        $userToDelete->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }

    public function activate(User $user)
    {
        $user->update(['active' => true]);
        return redirect()->route('users.index')->with('success', 'User activated successfully.');
    }

    public function deactivate(User $user)
    {
        $user->update(['active' => false]);
        return redirect()->route('users.index')->with('success', 'User deactivated successfully.');
    }

    public function resetPassword($id)
    {
        $user = User::findOrFail($id);
        $newPassword = 'P@ssw0rd'; // Generate or specify a new password
        $user->update(['password' => Hash::make($newPassword)]);
        return redirect()->route('admin.users')->with('success', 'Password reset successfully.');
    }
}
