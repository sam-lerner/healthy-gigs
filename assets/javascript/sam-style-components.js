M.AutoInit();

// Form date script
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });

// Form dropdown script

  $(document).ready(function(){
    $('select').formSelect();
  });
       