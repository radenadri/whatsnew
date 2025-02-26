<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\LaravelMarkdown\MarkdownRenderer;

class Post
{
    public string $slug;
    public string $title;
    public string $date;
    public string $content;
    public string $status;
    public array $metadata = [];

    public static function fromFile(string $filename): ?self
    {
        if (!Storage::disk('markdown')->exists($filename)) {
            return null;
        }

        $post = new self();

        // Extract date and slug from filename
        $parts = explode('-', $filename, 4);
        $post->date = "{$parts[0]}-{$parts[1]}-{$parts[2]}";
        $post->slug = Str::slug(pathinfo($parts[3] ?? '', PATHINFO_FILENAME));

        // Parse the markdown file
        $content = Storage::disk('markdown')->get("{$filename}");

        // Extract YAML front matter if it exists
        if (Str::startsWith($content, '---')) {
            $parts = explode('---', $content, 3);
            if (count($parts) >= 3) {
                $yaml = trim($parts[1]);
                $yamlLines = explode("\n", $yaml);
                foreach ($yamlLines as $line) {
                    if (Str::contains($line, ':')) {
                        [$key, $value] = explode(':', $line, 2);
                        $post->metadata[trim($key)] = trim($value);
                    }
                }
                $content = $parts[2];
            }
        }

        // Set the title from metadata or fallback to filename
        $post->title = $post->metadata['title'] ?? Str::title(str_replace('-', ' ', $post->slug));

        // Render markdown to HTML
        $markdownRenderer = app(MarkdownRenderer::class);
        $post->content = $markdownRenderer->toHtml($content);

        // Get status
        $post->status = $post->metadata['status'] ?? 'draft';

        return $post;
    }

    public static function all(): array
    {
        $files = Storage::disk('markdown')->allFiles();
        $posts = [];

        foreach ($files as $file) {
            if (!Str::endsWith($file, '.md')) {
                continue;
            }

            $filename = basename($file);
            $post = self::fromFile($filename);

            if ($post && $post->status === 'published') {
                $posts[] = $post;
            }
        }

        // Sort posts by date (newest first)
        usort($posts, function ($a, $b) {
            return strcmp($b->date, $a->date);
        });

        return $posts;
    }

    // Find a post by slug
    public static function findBySlug(string $slug): ?self
    {
        $files = Storage::disk('markdown')->files();

        foreach ($files as $file) {
            if (!Str::endsWith($file, '.md')) {
                continue;
            }

            $filename = basename($file);
            $post = self::fromFile($filename);

            if ($post && $post->slug === $slug) {
                return $post;
            }
        }

        return null;
    }
}
