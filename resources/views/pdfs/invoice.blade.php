<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VuexyAdmin - Invoice-#{{ $order->id }}</title>
    <style>
        /* A4 Print Styles */
        @page {
            size: A4;
            margin: 20mm;
        }

        @media print {
            body {
                font-size: 12pt;
                line-height: 1;
                background: white !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            .no-print {
                display: none !important;
            }

            .invoice-container {
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
            }
        }

        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            /* padding: 32px 16px; */
            padding: 0;
            line-height: 1;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        /* Invoice Container */
        .invoice-container {
            position: relative;
            z-index: 1;
        }

        .invoice-content {
            position: relative;
            z-index: 1;
            padding: 40px;
        }

        /* Header Section */
        .invoice-header {
            margin-bottom: 18px;
            /* border-bottom: 1px solid #dee2e6;
        padding-bottom: 14px; */
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: middle;
            padding: 0;
        }

        .company-info {
            width: 50%;
        }

        .company-info img {
            width: 100px;
        }

        .company-info p {
            font-size: 14px;
            color: #6c757d;
            margin: 2px 0;
        }

        .invoice-title-section {
            width: 50%;
            text-align: right;
        }

        .invoice-title {
            font-size: 42px;
            font-weight: bold;
            color: #2c3e50;
        }

        .status-badges {
            text-align: right;
            margin-bottom: 8px;
        }

        .invoice-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        .text-red-500 {
            background: #dc3545;
            color: white;
        }

        .text-green-500 {
            background: #28a745;
            color: white;
        }

        .text-indigo-500 {
            background: #6610f2;
            color: white;
        }

        .text-purple-500 {
            background: #6f42c1;
            color: white;
        }

        .text-yellow-600 {
            background: #ffc107;
            color: black;
        }

        .text-capitalize {
            text-transform: capitalize;
        }

        .delivered-status {
            background: #007bff;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        .not-delivered-status {
            background: #ffc107;
            color: black;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        .cancelled-delivered-status {
            background: #dc3545;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        /* Details Section */
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 7px;
            border: 1px solid #dee2e6;
        }

        .details-table td {
            padding: 8px 12px;
            border-bottom: 1px solid #e9ecef;
            border-right: 1px solid #e9ecef;
            vertical-align: middle;
        }

        .details-table td:last-child {
            border-right: none;
        }

        .details-table tr:last-child td {
            border-bottom: none;
        }

        .detail-item {
            margin-bottom: 12px;
        }

        .detail-label {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 2px;
            font-weight: 500;
        }

        .detail-value {
            font-weight: 600;
            font-size: 16px;
            color: #2c3e50;
        }

        .detail-value.large {
            font-size: 18px;
        }

        .detail-value.green {
            color: #28a745;
        }

        .detail-value.blue {
            color: #007bff;
        }

        /* Customer Information */
        .customer-section {
            padding-top: 14px;
            margin-bottom: 14px;
            /* border-top: 1px solid #dee2e6; */
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .customer-info {
            padding: 14px;
            border: 1px solid #e9ecef;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table td {
            width: 50%;
            vertical-align: top;
            padding: 0 16px 0 0;
        }

        .info-table td:last-child {
            padding: 0 0 0 16px;
        }

        .info-section h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #2c3e50;
        }

        .info-section p {
            margin: 4px 0;
            color: #6c757d;
            font-size: 14px;
        }

        .highlight {
            color: #2c3e50;
            font-weight: 600;
        }

        .margin-top-10 {
            margin-top: 10px;
        }

        /* Table Styles */
        .order-items-section {
            margin-bottom: 0px;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 0 14px 0;
            background: white;
            border: 1px solid #dee2e6;
            page-break-inside: auto;
        }

        .invoice-table thead {
            display: table-header-group;
            /* repeat on each page */
        }

        .invoice-table tbody {
            display: table-row-group;
        }

        .invoice-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        .invoice-table th {
            background-color: rgba(248, 249, 250, 0.75);
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #dee2e6;
            font-size: 14px;
            color: #2c3e50;
            border-right: 1px solid #dee2e6;
        }

        .invoice-table th:last-child {
            border-right: none;
        }

        .invoice-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #e9ecef;
            border-right: 1px solid #e9ecef;
            vertical-align: top;
        }

        .invoice-table td:last-child {
            border-right: none;
        }

        /* .invoice-table tr:hover {
        background-color: #f8f9fa;
      } */

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .amount-cell {
            text-align: right;
            font-weight: 600;
        }

        .item-name {
            font-weight: 600;
            margin-bottom: 4px;
        }

        .item-details {
            font-size: 14px;
            color: #6c757d;
        }

        /* Totals Section */
        .totals-section {
            margin-bottom: 14px;
        }

        .totals-wrapper {
            text-align: right;
        }

        .totals-table {
            width: 400px;
            border-collapse: collapse;
            margin-left: auto;
            display: inline-table;
        }

        .totals-table td {
            padding: 5px 0;
            border: none;
        }

        .totals-table .label {
            color: #6c757d;
            text-align: left;
            padding-right: 20px;
        }

        .totals-table .amount {
            text-align: right;
            font-weight: 600;
            width: 100px;
        }

        .total-row td {
            border-top: 2px solid #dee2e6;
            padding-top: 12px !important;
        }

        .total-row .label {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
        }

        .total-row .amount {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
        }

        /* Footer */
        .invoice-footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 14px;
            border-top: 1px solid #dee2e6;
        }

        .footer-title {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }

        .footer-contact {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 4px;
        }

        .footer-note {
            font-size: 12px;
            color: #adb5bd;
        }

        /* Buttons */
        .button-section {
            text-align: center;
            margin-top: 14px;
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 6px;
            border: none;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }

        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background-color: #545b62;
        }

        .watermark {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.4;
            pointer-events: none;
            background-image: url('{{ asset('images/circle-logo.png') }}');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 80%;
        }

        /* Clear fix utility */
        .clearfix:after {
            content: '';
            display: table;
            clear: both;
        }

        /* Float utilities */
        .float-left {
            float: left;
        }

        .float-right {
            float: right;
        }
    </style>
</head>

<body>
    <!-- Watermark -->
    <div class="watermark"></div>

    <div class="invoice-container">
        <div class="invoice-content">
            <!-- Header Section -->
            <div class="invoice-header">
                <table class="header-table">
                    <tr>
                        <td class="company-info">
                            <img src="{{ asset('images/logo-main-black.png') }}" alt="VuexyAdmin Logo" />
                            <p><a href="https://www.vuexy-admin.ca">https://www.vuexy-admin.ca</a></p>
                            <p>VuexyAdmin Bodycon Fabrics Ltd.</p>
                        </td>
                        <td class="invoice-title-section">
                            <h1 class="invoice-title">INVOICE</h1>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Invoice Details -->
            <table class="details-table">
                <tr>
                    <td class="detail-label" style="width: 25%">Invoice ID</td>
                    <td class="detail-value" style="width: 25%">INV-{{ $order->id }}</td>
                    <td class="detail-label" style="width: 25%">Payment Status</td>
                    <td class="detail-value" style="width: 25%">
                        @php
                            $statusData = App\Helpers\Helpers::paymentStatusMap($order->payment_status);
                        @endphp
                        <span
                            class="invoice-badge text-capitalize {{ $statusData['color'] }}">{{ $statusData['label'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">Order ID</td>
                    <td class="detail-value">ORD-{{ $order->id }}</td>
                    <td class="detail-label">Delivery Status</td>
                    <td class="detail-value">
                        @if ($order->status == 'delivered')
                            <span class="delivered-status">{{ 'Delivered' }}</span>
                        @elseif ($order->status == 'cancelled')
                            <span class="cancelled-delivered-status">{{ 'Cancelled' }}</span>
                        @else
                            <span class="not-delivered-status">{{ 'Not Yet Delivered' }}</span>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">Order Date</td>
                    <td class="detail-value">{{ $order->created_at->format('M d, Y') }}</td>
                    <td class="detail-label"></td>
                    <td class="detail-value"></td>
                </tr>
                <tr>
                    <td class="detail-label">Payment Method</td>
                    <td class="detail-value capitalize">
                        {{ $transaction->card_type ?? ($transaction->wallet_type ?? '') }}
                        {{ $transaction && $transaction->card_number ? "••••{$transaction->card_number}" : '' }}</td>
                    <td class="detail-label"></td>
                    <td class="detail-value"></td>
                </tr>
            </table>

            <!-- Customer Information -->
            <div class="customer-section">
                <h2 class="section-title">Customer Information</h2>

                <div class="customer-info">
                    <table class="info-table">
                        <tr>
                            <td>
                                <div class="info-section">
                                    <h3>Full Name</h3>
                                    <p class="highlight">{{ $order->user->full_name }}</p>

                                    <h3 class="margin-top-10">Phone</h3>
                                    <p class="highlight">{{ $order->user->phone }}</p>

                                    <h3>Email</h3>
                                    <p class="highlight">{{ $order->user->email }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="info-section">
                                    <h3 class="margin-top-10">Shipping Address</h3>
                                    <p class="highlight">{{ $order->address['name'] ?? '' }}</p>
                                    <p class="highlight">{{ $order->address['phone'] ?? '' }}</p>
                                    <p class="highlight">{{ $order->address['address'] ?? '' }},
                                        {{ $order->address['city']['name'] ?? '' }},
                                        {{ $order->address['state']['name'] ?? '' }},
                                        {{ $order->address['country']['name'] ?? '' }}
                                        {{ $order->address['zip'] ?? '' }}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Order Items Table -->
            <div class="order-items-section">
                <h2 class="section-title">Order Items</h2>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th style="width: 8%">SL.</th>
                            <th style="width: 40%">Item Information</th>
                            <th style="width: 12%">Quantity</th>
                            <th style="width: 15%">Actual Price</th>
                            <th style="width: 10%">Discount</th>
                            <th style="width: 15%">Final Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->items as $index => $item)
                            <tr>
                                <td class="text-center">{{ $index + 1 }}</td>
                                <td>
                                    <div class="item-name">{{ $item->product->name }}</div>
                                    @if ($item->variation)
                                        <div class="item-details">
                                            @foreach ($item->variation->variationAttributes as $attribute)
                                                {{ $attribute->attribute->name }}:
                                                {{ $attribute->attributeItem->name }}@if (!$loop->last)
                                                    ,
                                                @endif
                                            @endforeach
                                        </div>
                                    @endif
                                </td>
                                <td class="text-center">{{ $item->quantity }}</td>
                                <td class="amount-cell">${{ number_format($item->product_price, 2) }}</td>
                                <td class="text-center">
                                    @if ($item->discount_type == 1)
                                        {{ $item->discount_amount }}%
                                    @else
                                        ${{ number_format($item->discount_amount, 2) }}
                                    @endif
                                </td>
                                <td class="amount-cell">${{ number_format($item->discount_price, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Totals Section -->
            <div class="totals-section">
                <div class="totals-wrapper">
                    <table class="totals-table">
                        <tr>
                            <td class="label">Subtotal</td>
                            <td class="amount">${{ $order->product_price }}</td>
                        </tr>
                        <tr>
                            <td class="label">VAT ({{ $order->vat }}%)</td>
                            <td class="amount">${{ $order->vat_amount }}</td>
                        </tr>
                        <tr>
                            <td class="label">Delivery Charge</td>
                            <td class="amount">${{ $order->shipping_cost }}</td>
                        </tr>
                        <tr class="total-row">
                            <td class="label">Total Amount</td>
                            <td class="amount">${{ $order->total_amount }}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Footer -->
            <div class="invoice-footer">
                <p class="footer-title">Thank you for shopping with us!</p>
                <p class="footer-contact">
                    For help, contact <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@vuexy-admin.ca"
                        target="_blank">contact@vuexy-admin.ca</a>
                </p>
                <p class="footer-note">This is a computer generated invoice — no signature is required.</p>
            </div>
        </div>
    </div>
</body>

</html>
