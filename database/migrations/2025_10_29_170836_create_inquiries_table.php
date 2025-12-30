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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->longText('message')->nullable();
            $table->tinyInteger('status')->default(0)->comment('0 = pending, 1 = resolved, 2 = action required');
            $table->longText('comment')->nullable();
            $table->unsignedBigInteger('resolved_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('name');
            $table->index('email');
            $table->index('phone');
            $table->foreign('resolved_by')->references('id')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
