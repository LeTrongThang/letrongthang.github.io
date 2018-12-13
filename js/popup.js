
status="Mr.Phong"
var a=new Array(),n=""
a[1]='Đ';
a[2]='ú';
a[3]='n';
a[4]='g';
a[5]=' ';
a[6]='v';
a[7]='ậ';
a[8]='y';
a[9]='!';
a[10]=' ';
a[11]='a';
a[12]='n';
a[13]='h';
a[14]=' ';
a[15]='P';
a[16]='h';
a[17]='o';
a[18]='n';
a[19]='g';
a[20]=' ';
a[21]='t';
a[22]='ố';
a[23]='t';
a[24]=' ';
a[25]='n';
a[26]='h';
a[27]='ấ';
a[28]='t';
a[29]=' ';
a[30]='v';
a[31]='ũ';
a[32]=' ';
a[33]='t';
a[34]='r';
a[35]='ụ';
a[36]=' ';
a[37]='♥';
a[38]=' ';
a[39]='Y';
a[40]='ê';
a[41]='u';
a[42]=' ';
a[43]='A';
a[44]='n';
a[45]='h';
a[46]='♥';
a[47]='♥';
function one()
{
t=document.f.txt.value
j=t.length
if(j>0)
{
for(var i=1;i<=j;i++)
{
n=n+a[i]
if(i==48)
{
document.f.txt.value=""
n=""
}
}
}
document.f.txt.value=n
n=""
setTimeout("one()",1)
}
function s()
{
}
function on()
{
one()
}

        $(document).ready(function() {
            $('#k').hide();
            $('h1').click(function() {
                $('.active').removeClass('active');
                $('#k').slideUp('fast');
                if($(this).next('#k').is(':hidden') == true) {
                $(this).addClass('active');
                $(this).next('#k').slideDown('fast');
                }
            });
        });
					function Yeu()
					{
					$("#divResult").fadeOut(0);
					$("#divResult").html("</br><h2>Ủ ÔI! AI CŨNG NÓI VẬY ĐÓ <img src='http://vozforums.com/images/smilies/Off/adore.gif'</img></h2>");
					$("#divResult").fadeIn(2000,function()
							{
							$("#divResult2").fadeOut(0);
							$("#divResult2").html("<p>Mặc kệ người ta nói, Anh chỉ yêu mình em hoy <img src='http://vozforums.com/images/smilies/Off/angry.gif'/></p></br>");
							$("#divResult2").fadeIn(2000,function()
									{
									$("#divResult3").fadeOut(0);
									$("#divResult3").html("<p>Anh yêu em lắm ♥ <img src='http://vozforums.com/images/smilies/Off/sure.gif'/></p></br>");
									$("#divResult3").fadeIn(2000);
									}
								);
							}
						);
					}
				