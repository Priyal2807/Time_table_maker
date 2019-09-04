$(function() {
  $('#addbutton').on('click', function() {
    var count = $('#sno').val();
    var sti = $("#inpTimestart").val();
    var eti = $('#inpTimeend').val();
    var desci = $('#inpDesc').val();
    if (!$("#inpTimestart").val() || !$('#inpTimeend').val() || !$('#inpDesc').val()) {
      alert("Enter value");
      return;
    }
    var newDet = {
      tid: count,
      st: sti,
      et: eti,
      desc: desci
    };
    $.ajax({ //this ajax request is fired when this url / todo is hit
      type: 'POST',
      url: '/timeTable',
      data: newDet,
      success: function(data) { //here the updated data is used after the data has been changed using the /todo app controller
        location.reload();
      }
    });


  });

  $('.clickIcon').click(function(ev) {
    var txt = $(this).parent().text();

    // console.log($(this).parent().text().toJSON());
  })
});