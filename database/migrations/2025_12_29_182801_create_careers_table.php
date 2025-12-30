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
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->string('employment_status')->nullable();
            $table->string('employment_type')->nullable();
            $table->string('level')->nullable();
            $table->integer('vacancy')->default(0);
            $table->string('salary_range')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('benefits')->nullable();
            $table->string('status')->nullable()->default('active');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('title');
            $table->foreign('created_by')->references('id')->on('admins');
            $table->foreign('updated_by')->references('id')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
