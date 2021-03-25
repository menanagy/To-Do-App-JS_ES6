// Elements
// sumbit --> Event
// take Data
// put all data in bject [FirstName,LastName,Age,UniqueID]
// put object in Array 
// store Data Loca


//get Form
const student_data=document.getElementById("student");
//get Form

const first_name=document.getElementById("first-name");
//get Last Name

const last_name=document.getElementById("last-name");
//get Form

const age=document.getElementById("age");

const students_table=document.querySelector("#students tbody");
//Declar Array 


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

   // put all data in bject [FirstName,LastName,Age,UniqueID]
   let uid=Math.floor(Math.random()*50000);
   let student ={uid:uid,first_name:first_name.value,last_name:last_name.value,age:age.value}
   //console.log(student);

            console.log(`student = ${student}`);
            studentArray.push(student);
            displayStudent(student);
            //Store Object in Array 
            
            //console.log(studentArray);
            // store Data Local Storage
            localStorage.setItem("students",JSON.stringify(studentArray)); 
   clearInputs();
 
}

displayStudent=(student)=>{
        
                students_table.innerHTML+=`<tr class="text-center text-white">
                <td>${student.first_name}</td>
                <td>${student.last_name}</td>
                <td>${student.age} </td>
                <td><i class="fa fa-trash btn btn-danger" onClick="delet_item(${student.uid})" id="${student.uid}"></i></td>`

}

//Clear Inputs After Add Element
clearInputs=()=>{
    first_name.value="";
   last_name.value="";
   age.value="";
}
//Display all Items From Local Storage 
function displayItems (arr){
    console.log(arr);
    arr.map((student)=>{
         students_table.innerHTML+=`<tr class="text-center text-white">
        <td>${student.first_name}</td>
        <td>${student.last_name}</td>
        <td>${student.age} </td>
        <td><i class="fa fa-trash btn btn-danger" onClick="delet_item(${student.uid})" id="${student.uid}"></i></td>`
    });
   if(arr.length>0){
        document.querySelector("#students").innerHTML+=`
        <tfoot>
            <tr>
                <td colspan="4">
                     <button class="btn btn-danger btn-block w-100" onClick="ClearAll()">Clear Items</button>
                    </td>
                </tr>
           </tfoot>
        `
        
    }
   
}

function delet_item(id){
    console.log(id);
    console.log(document.getElementById(id));
    //tr--> td --> Delet icon (i want Delete Tr)
    console.log(document.getElementById(id).parentNode);
    console.log(document.getElementById(id).parentNode.parentNode);
    document.getElementById(id).parentNode.parentNode.remove();
    data=JSON.parse(localStorage.getItem("students"))
    newData=data.filter((item)=>item.uid !== id);//All Data Without Specific id 
    console.log(newData);
    localStorage.setItem("students",JSON.stringify(newData)); 

}
ClearAll = () =>{
    console.log("Clear ALL");
    localStorage.setItem("students","[]");
    students_table.innerHTML='';
    document.querySelector("#students tfoot").remove();
}