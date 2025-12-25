@extends('email.layout')
@section('content')
    <tr>
        <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 0 2.5em; text-align: left; padding-bottom: 3em;">
                        <div class="text">
                            <p>Hello {{ $name }},</p>

                            <p>We’re writing to confirm that your VuexyAdmin account has been deleted as requested.</p>

                            <p>All of your personal information associated with this account has been securely removed from
                                our system.
                                If this was accidental or you change your mind, you’re always welcome to create a new
                                account and continue shopping with us.</p>

                            <p style="margin-top: 30px;">Thank you for being part of our community.<br>
                                Best regards,<br>The VuexyAdmin Team</p>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
@endsection
