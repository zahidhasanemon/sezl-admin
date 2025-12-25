@extends('email.layout')
@section('content')
<tr>
    <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 0 2.5em; text-align: left; padding-bottom: 3em;">
                    <div class="text">
                        <p>Hello {{ $name }},</p>
                        
                        <p>Welcome to VuexyAdmin! We're excited to have you join us.</p>
                        
                        <p>To complete your registration, please verify your email address using the code below:</p>
                        
                        <div style="background: #f7fafa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
                            <h2 style="margin: 0; color: #000; font-size: 32px; letter-spacing: 5px;">{{ $otp }}</h2>
                        </div>
                        
                        <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                        
                        <p style="color: #666; font-size: 14px;">If you did not create an account with VuexyAdmin, please ignore this email.</p>
                        
                        <p style="margin-top: 30px;">Best regards,<br>The VuexyAdmin Team</p>
                    </div>
                </td>
            </tr>
        </table>
    </td>
</tr>
@endsection
