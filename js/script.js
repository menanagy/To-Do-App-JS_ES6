// Elements
// sumbit --> Event
// take Data
// put all data in bject [FirstName,LastName,Age,UniqueID]
// put object in Array 
// store Data Loca
let count=0;

//get Form  
const student_data=document.getElementById("student");
//get First-Name Input 
const first_name=document.getElementById("first-name");
//get Last Name Input 
const last_name=document.getElementById("last-name");
//get Age Input 
const age=document.getElementById("age");
//get Body of Table
let students_table=document.querySelector("#students tbody");

//Declare Array 
if(localStorage.getItem("students")){
    studentArray=JSON.parse(localStorage.getItem("students"));
    console.log(studentArray);
}
else{
    studentArray=[];
}
//Display All Items()
displayItems(studentArray);


// take Data When Sumbit
student_data.onsubmit=(e)=>{
        // take Data When Sumbit
        e.preventDefault();
        // console.log(`First Name = ${first_name.value}`);
        // console.log(`Last Name = ${last_name.value}`);
        // console.log(`Age = ${age.value}`);
        let uid=Math.floor(Math.random()*50000);//==>Make unique Id 
        // put all data in bject [FirstName,LastName,Age,UniqueID]
        let student ={uid:uid,first_name:first_name.value,last_name:last_name.value,age:age.value};
        console.log(`student object = ${student}`);//print Object 
        //Store Object in Array 
        studentArray.push(student);
        console.log(`Store  data in  Array  ==> Array = `);
        console.log(studentArray);
        // store Data Local Storage
        localStorage.setItem("students",JSON.stringify(studentArray));
        console.log("Store Array data in  localstorage = ");
        console.log(JSON.parse(localStorage.getItem("students"))); 
        displayStudent(student);
        
        clearInputs();
 
}

displayStudent=(student)=>{
                count++;
                console.log(`Welcome Count =  ${count}`);
                displayStudentHTML(student);
                data=JSON.parse(localStorage.getItem("students"))   
                console.log(`dataLength= ${data.length}`); 
                if(data.length==1){
                    displayTfoot();
                }

}

//Clear Inputs After Add Element
clearInputs=()=>{
    first_name.value="";
   last_name.value="";
   age.value="";
}
//Display all Items From Local Storage 
function displayItems (arr){
    console.log(`displayItems : Array Local Storage  =  ${arr} `);
    arr.map((student)=>{
        displayStudentHTML(student);
    });
   if(arr.length>0){
        displayTfoot();
    }
   
}

function delet_item(id){
    console.log(id);
    console.log(document.getElementById(id));
    //tr--> td --> Delet icon (i want Delete Tr)
    //console.log(document.getElementById(id).parentNode);//==>td
    //console.log(document.getElementById(id).parentNode.parentNode);//==>tr
    document.getElementById(id).parentNode.parentNode.remove();
    data=JSON.parse(localStorage.getItem("students"))
    newData=data.filter((item)=>item.uid !== id);//All Data Without Specific id 
    console.log(newData);
    if(newData.length>0){
        localStorage.setItem("students",JSON.stringify(newData)); 

    }
    else{
        ClearAll();
        //localStorage.setItem("students","[]");
        //document.querySelector("#students tbody").innerHTML='';

    }
}
ClearAll = () =>{
    console.log("Clear ALL");
    localStorage.setItem("students","[]");
    let students_table=document.querySelector("#students tbody");
    students_table.innerHTML='';
   document.querySelector("#students tfoot").remove();
   data=JSON.parse(localStorage.getItem("students"))   
   console.log(`After Clear All ==> dataLength= ${data.length}`); 

}

function displayTfoot(){
    console.log("Start display Tfoot");
    document.querySelector("#students").innerHTML+=`
        <tfoot>
            <tr>
                <td colspan="4">
                     <button class="btn btn-danger btn-block w-100" onClick="ClearAll()">Clear Items</button>
                    </td>
                </tr>
           </tfoot>
        `
        console.log("Finish display Tfoot");
}

function displayStudentHTML(student){
    console.log("Start displayStudentHTML ");
    let students_table=document.querySelector("#students tbody");
    students_table.innerHTML += `
    <tr class="text-center text-white">
        <td>${student.first_name}</td>
        <td>${student.last_name}</td>
        <td>${student.age} </td>
        <td><i class="fa fa-trash btn btn-danger" onClick="delet_item(${student.uid})" id="${student.uid}"></i></td>
    </tr>
    `
    console.log("Finish displayStudentHTML");

}