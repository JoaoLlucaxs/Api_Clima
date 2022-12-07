
const btn=document.querySelector('button')

btn.addEventListener('click',async(event)=>{
    event.preventDefault()
    const input=document.querySelector('#searchInput').value
    
    if(input !== ''){
        showWarnin('Carregando..')

        let url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=74f3cbef8549950df01f7d6c250768e3&units=metric&lang=pt_br`

        let result=await fetch(url)
        let jsonn=await result.json()

       if(jsonn.cod === 200){
        showInfo({
            nome:jsonn.name,
            country:jsonn.sys.country,
            temp:jsonn.main.temp,
            tempIcon:jsonn.weather[0].icon,
            windSped:jsonn.wind.speed,
            windAngle:jsonn.wind.deg
        })
            
        }else{
        showWarnin('Não encontramos está localização')

       }
    }
})

function showInfo(json){
    showWarnin('')

    const resultado=document.querySelector('.resultado');
    resultado.classList.add('ativo')

    document.querySelector('.titulo').innerHTML=`${json.nome} ,${json.country}`
    document.querySelector('.tempInfo').innerHTML=`${json.temp} <sup>C</sup>`
    document.querySelector('.ventoInfo').innerHTML=`${json.windSped} <span>Km/h</span>`
    document.querySelector('.ventoPonto').style.transform=`rotate(${json.windAngle}deg)`
}

function showWarnin(msg){
    document.querySelector('.aviso').innerHTML=msg
}
