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
        Schema::create('about_us_contents', function (Blueprint $table) {
            $table->id();
            $table->string('chairman_name')->nullable();
            $table->longText('chairman_message')->nullable();
            $table->longText('overview_message')->nullable();
            $table->longText('history')->nullable();
            $table->longText('mission')->nullable();
            $table->longText('vision')->nullable();
            $table->longText('core_services')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('admins');
            $table->foreign('updated_by')->references('id')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us_contents');
    }
};
