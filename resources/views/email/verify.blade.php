@extends('email.layout')
@section('content')
<tr>
    <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 0 2.5em; text-align: center; padding-bottom: 3em;">
                    <div class="text">
                        <h2>Ronald would like to be your friend on e-Verify</h2>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="text-align: center;">
                    <div class="text-author">
                        <img src="images/person_2.jpg" alt="" style="width: 100px; max-width: 600px; height: auto; margin: auto; display: block;">
                        <h3 class="name">Ronald Tuff</h3>
                        <span class="position">CEO, Founder at e-Verify</span>
                        <p><a href="#" class="btn btn-primary">Accept Request</a></p>
                        <p><a href="#" class="btn-custom">Ignore Request</a></p>
                    </div>
                </td>
            </tr>
        </table>
    </td>
</tr>
@endsection
