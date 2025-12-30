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
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type_id')->nullable();
            $table->string('file_type')->nullable()->comment('image, video');
            $table->string('title')->nullable();
            $table->string('file_name')->nullable();
            $table->text('description')->nullable();
            $table->text('video_url')->nullable();
            $table->boolean('home_page')->default(false);
            $table->boolean('facility_page')->default(false);
            $table->boolean('status')->default(true);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('title');
            $table->foreign('type_id')->references('id')->on('gallery_types');
            $table->foreign('created_by')->references('id')->on('admins');
            $table->foreign('updated_by')->references('id')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
