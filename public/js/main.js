//Links
const verify_email = "./utils/register_email.php";
const verify_otp   = "./utils/validate.php";

//DOM Elements
const email_submit         = document.getElementById( "email-submit-btn" );
const alert_msg            = document.getElementById( "alert-msg" );
const email                = document.getElementById( "email" );
const email_input          = document.getElementById( "email-input" );
const otp_input            = document.getElementById( "otp-input" );
const otp_submit           = document.getElementById( "otp-submit-btn" );
const otp                  = document.getElementById( "OTP" );
const registration_success = document.getElementById( "register-success" );
const new_user_name        = document.getElementById( "new-user-name" );
const email_text           = document.getElementById( "email-text" );
const email_loader         = document.getElementById( "email-loader" );
const otp_text             = document.getElementById( "otp-text" );
const otp_loader           = document.getElementById( "otp-loader" );

//Constants
const loading_classes = ["fa", "fa-circle-o-notch", "fa-spin"];

//Event Listeners
email_submit.addEventListener(
	"click",
	async function () {
		email_loader.classList.remove( "hidden-class" );
		email_text.classList.add( "hidden-class" );
		email_loader.classList.add( ...loading_classes );
		if (ValidateEmail( email.value )) {
			let resp  = await asyncAjaxRequest( verify_email, "POST", { email: email.value } );

			const { status} = resp;
			sessionStorage.setItem( "email", email.value );
			switch (status) {
				case 200:
					alert_msg.innerHTML = "Enter OTP send to your mail.";
					showOTPDiv();
					break;
				case 201:
					alert_msg.innerHTML = "Already Registered.";
					showOTPDiv();
					break;
				case 500:
					alert_msg.innerHTML = "Enternal Server Error.";
					showOTPDiv();
					break;
				default:
					break;
			}

		} else {
			alert_msg.innerHTML = "Please enter a valid email address!";
		}
		email_loader.classList.add( "hidden-class" );
		email_text.classList.remove( "hidden-class" );
		email_loader.classList.remove( ...loading_classes );
	}
)

otp_submit.addEventListener(
	"click",
	async function () {
		email_loader.classList.remove( "hidden-class" );
		email_text.classList.add( "hidden-class" );
		email_loader.classList.add( ...loading_classes );
		if (ValidateOTP( otp.value )) {
			let email              = sessionStorage.getItem( "email" );
			sessionStorage.setItem( "email" ,email);
			let resp               = await asyncAjaxRequest( verify_otp, "POST", { email: email, otp: otp.value } );
			const { status } = resp;
			switch (status) {
				case 200:
					alert_msg.innerHTML = "Registration Sucessfull.";
					showRegisterSuccessDiv();
					break;
				case 201:
					alert_msg.innerHTML = "Already Registered.";
					showOTPDiv();
					break;
				case 202:
					alert_msg.innerHTML = "Enter Valid OTP.";
					showOTPDiv();
					break;
				case 404:
					alert_msg.innerHTML = "User Not Found.";
					showOTPDiv();
					break;
				case 422:
					alert_msg.innerHTML = "Enter Valid Email.";
					showOTPDiv();
					break;
				case 500:
					alert_msg.innerHTML = "Enternal Server Error.";
					showOTPDiv();
					break;
				default:
					break;
			}

		} else {
			alert_msg.innerHTML = "Please enter a valid 6 digit OTP!";
		}
		email_loader.classList.add( "hidden-class" );
		email_text.classList.remove( "hidden-class" );
		email_loader.classList.remove( ...loading_classes );
	}
)


//Functions
const ValidateEmail = function (email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( email )) {
		return (true)
	}
	return (false)
}

const showOTPDiv = function () {
	email_input.style = "display:none";
	otp_input.style   = "display:block";
}

const ValidateOTP = function (otp) {
	if (otp.length > 0 && otp.length == 6) {
		return (true)
	}
	return (false)
}

const showRegisterSuccessDiv   = () => {
	otp_input.style            = "display:none";
	registration_success.style = "display:block";
}

const asyncAjaxRequest = async(
	link,
	method,
	body
) => {
	let res;
	console.log( body );
		body           = JSON.stringify( body );
	if (body === null) {
		res = await fetch(		
			link,
			{
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				   },
				method: method,
				}
		);
	} else {
		res = await fetch(
			link,
			{
				method: method,
				body: body,
				}
		);
	}
		//const data =  res.;
		console.log("i love my india");
		console.log( res.body );
		console.log(res.status);
		return { status: res.status };
	};