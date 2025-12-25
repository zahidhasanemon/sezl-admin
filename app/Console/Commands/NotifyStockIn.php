<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\{Wishlist, Notification, Product, StockNotification};

class NotifyStockIn extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:notify-stock-in';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify users of product resstock';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $queuedItem = StockNotification::orderBy('id')->first();
        if (! $queuedItem) {
            return;
        }
        $product = Product::find($queuedItem->product_id);

        if (!$product) {
            $queuedItem->delete();
            return;
        }

        Wishlist::where('product_id', $product->id)->where('notify', true)->chunk(100, function ($wishlists) use ($product) {
            foreach ($wishlists as $wishlist) {
                Notification::create([
                    'user_id' => $wishlist->user_id,
                    'type' => 'product',
                    'target_type' => Product::class,
                    'target_id' => $product->id,
                    'data' => [
                        'product_id' => $product->id,
                        'title' => $product->name . ' is Restocked.',
                        'body' => 'Hurry up to grab your desired product before it stocks out again.',
                    ],
                ]);
            }
        });

        $queuedItem->delete();
    }
}
