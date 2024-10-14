<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        if(!session('page'))
        {
            $page = '/calender';
            session(['page' => $page]);
        }
        
        // Log::info(Auth::user()->usert_type);
        switch (Auth::user()->user_type) {
            case 'admin':
                
                return view('dashboards.admin');
                break;
            case 'user':
                return view('dashboards.user');
                break;

            default:
                return view('welcome');
        }
    }
}
