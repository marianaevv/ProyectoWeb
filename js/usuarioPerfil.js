
$('.miPerfil').click(function(){
  // $(".formPerfil").hide();
   $(".formPerfil").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
});

$('.direcciones').click(function(){
    // $(".formPerfil").hide();
     $(".formPerfil").css("display","block").animate({height:"toggle", opacity:"toggle"}, "slow");;
  });

function onClickClose(){
    
}

/*
btnDirecciones.addEventListener('click', (event)=>{
    event.preventDefault();
    console.log("Click");
})
*/