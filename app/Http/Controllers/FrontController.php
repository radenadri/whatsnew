<?php

namespace App\Http\Controllers;

use App\Models\Post;

class FrontController extends Controller
{
    public function index()
    {
        $posts = Post::all();

        return inertia('Home', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = Post::findBySlug($slug);

        if (!$post) {
            abort(404);
        }

        return inertia('PostDetail', [
            'post' => $post,
        ]);
    }
}
