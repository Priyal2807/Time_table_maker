$(function() {
  $('#addbutton').on('click', function() {
    alert('heelo');
    var sti = $("#inpTimestart").val();
    var eti = $('#inpTimeend').val();
    var desci = $('#inpDesc').val();
    var newDet = {
      st: sti,
      et: eti,
      desc: desci
    };
    $.ajax({ //this ajax request is fired when this url / todo is hit
      type: 'POST',
      url: '/timeTable',
      data: newDet,
      success: function(data) { //here the updated data is used after the data has been changed using the /todo app controller
        //do something with the data via front-end framework
        location.reload();
      }
    });


  });
});