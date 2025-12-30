<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_news', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_category_id');
            $table->unsignedBigInteger('news_id');
            $table->timestamps();

            $table->foreign('news_category_id')->references('id')->on('news_categories');
            $table->foreign('news_id')->references('id')->on('news');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_news');
    }
};
