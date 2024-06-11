var arrData = ""
$.ajax({
    url:'https://script.google.com/macros/s/AKfycby7KqBj0W_cWLfiFfHZe6rxNFbHKUCtJJQCWEMUyDTBzpKeKGGlxO7b5xIYYslSAyhj/exec',
    type: 'GET',
    success: function(respon){
        try {
            if(respon.STATUS === 200){
                tranferData(respon.DATA) 
            }
        } catch (error) {
            console.log(error)
        }   
    }
})

function tranferData(data){
    document.title = "korea grammar"
    arrData = data
    displayData(arrData)
    clickDetail(arrData)
    search()
}

function displayData(data){
    $("#search-bar").focus()
   
    let word = ""
    for(d of data){
        word +=` <div class=" container text-view">
                    <h5>(${d.EN}) ${d.KOREA}</h5>
                    <p>${d.KHMER}</p>
                </div>`
    }
    document.getElementById("data-view").innerHTML = word
}

function search(){
    $("#search-bar").on("search",function(){
        window.location.reload()
    })

    $("#search-bar").keyup(function(){
        let value = $(this).val()
        let resultSearch = valsearch(value, arrData)
        displayData(resultSearch)

       clickDetail(resultSearch)

    })
    
    function valsearch(value, data){
        var searchValue = []
        for(s of data){
            if(s.KOREA.includes(value)){
                searchValue.push(s)
            }
        }
        return searchValue
    }

}
function clickDetail(d){
    $(".text-view").click(function(){
        let num = $(this).index()
        //MARK: make hide main
       // $(".main").hide()

        let detail = `<div class="container detail-view">
                <div class="btn-back"><i class="fa fa-chevron-left"></i></div>
                <div>
                    <h5>${d[num].EN} ${d[num].KOREA}</h5>
                    <p><b>[ ${d[num].KHMER} ]<b></p>
                    <p>${d[num].MEANING}</p>
                </div>

            </div>`

         $('body').append(detail)
        back()
    })
}


function back(){
    $(document).ready(function(){
        $(".btn-back").click(function(){
           $(".detail-view").remove()
        })
    })
}





