<?php
// $onloadAttribute = '';
// $onloadMessage = '';
// $onloadPage = '';
// if (session('page')) {
//     $page = session('page');
//     $onloadPage = "call_pagelet('$page','component_dock');";
// }

// if (session('success') !== null)

// {
// $onloadMessage = "SuccessToast.fire({title: \"{{ session('success') }}\"});";

// }

// if (session('errors') !== null)
// {
//     $onloadMessage = "ErrorToast.fire({title: \"{{ session('errors') }}\"});";
// }

// $onloadAttribute = "onload=".$onloadPage.$onloadMessage;
?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@500;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Include SweetAlert CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <!-- Libraries Stylesheet -->
    <link rel="stylesheet" href="{{ asset('admin_assets/lib/owlcarousel/assets/owl.carousel.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('admin_assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css') }}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('admin_assets/lib/notify/css/jquery.growl.css') }}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('admin_assets/lib/notify/css/notifIt.css') }}" rel="stylesheet" />

    <!-- Customized Bootstrap Stylesheet -->
    <link href="{{ asset('admin_assets/css/bootstrap.min.css') }}" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="{{ asset('admin_assets/css/style.css') }}" rel="stylesheet">
</head>

<body>

    <!-- Spinner Start -->
    <div id="spinner" class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->
    @include('layouts.navigation_admin')

    <!-- Content Start -->
    <div class="content">
        @include('layouts.topbar')

        <!-- Page Content -->
        <!-- Blank Start -->

        <div>
            {{ $slot }}
        </div>
        <!-- Blank End -->
        @if (session('success') !== null)
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                notif({
                    heading: 'Success',
                    msg: "{{ session('success') }}",
                    type: 'success',
                    position: 'right'
                });
            });
        </script>
        @endif

        @if (session('errors') !== null)
        @foreach (session('errors')->all() as $error)
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                notif({
                    heading: 'Error',
                    msg: "{{ $error }}",
                    type: 'error',
                    position: 'right'
                });
            });
        </script>
        @endforeach
        @endif
    </div>
    <!-- Content End -->



    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('admin_assets/lib/chart/chart.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/easing/easing.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/waypoints/waypoints.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/owlcarousel/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/tempusdominus/js/moment.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/tempusdominus/js/moment-timezone.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/notify/js/rainbow.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/notify/js/jquery.growl.js') }}"></script>
    <script src="{{ asset('admin_assets/lib/notify/js/notifIt.js') }}"></script>
    <!-- Include SweetAlert JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Template Javascript -->
    <script src="{{ asset('admin_assets/js/main.js') }}"></script>
    <script src="{{ asset('admin_assets/kingslibrary.js') }}"></script>
</body>

</html>