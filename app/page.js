"use client"
import {useState,useEffect} from "react";
export default function jogo() 
{
  const [pontos, setPontos] =useState(0)
  const[poderDeClique,setPoderDeClique] = useState(1)
  const[rendaPassiva, setrendaPassiva] = useState(0)
  const[jogoCarregado, setJogoCarregado] = useState(false)
  
  
  function tocarSomDeClique(){
    const audio = new Audio('/money.mp3')
    audio.play().catch(()=> console.log('som de clique nao econtrado'))
  }
    function tocarSomDeCompra(){
    const audio = new Audio('')
    audio.play().catch(()=> console.log('som de compra nao econtrado'))
  }

  useEffect(() => {
    const save = localStorage.getItem('meu_jogo_save')
    if(save){
      const dadosSalvos =JSON.parse(save);
      setPontos(dadosSalvos.pontosSalvos);
      setPoderDeClique(dadosSalvos.poderSalvo);
      setrendaPassiva(dadosSalvos.rendaSalva);
    }
    setJogoCarregado(true)
  },[]) 

  useEffect(() => {
    if(!jogoCarregado) return;
    const meusDados ={
      pontosSalvos: pontos,
      poderSalvo: poderDeClique,
      rendaSalva: rendaPassiva,
    };
    localStorage.setItem("meu_jogo_save", JSON.stringify(meusDados));
  },[pontos,poderDeClique,rendaPassiva,jogoCarregado])
   function clicarNoBotao(){
    setPontos(pontos + poderDeClique)
    tocarSomDeClique()
  }

  function comprarUpgrade(custoDoItem,poderDoItem,passivaItem){
    if(pontos >= custoDoItem){
      setPontos(pontos - custoDoItem)
      setPoderDeClique(poderDeClique + poderDoItem)
      setrendaPassiva(rendaPassiva + passivaItem)
    }else{
      alert("ta pobre ai caba")
    }
  }


  
  const upgrades = [
    {
      id: 1,
      nome: "the wiz",
      custo: 100,
      descriçao:"gera mais 1 tear per click",
      poder: 1,
      passivo: 0
    },
    {
      id: 2,
      nome: "harlequin baby",
      custo: 20,
      descriçao:"gera 1 tears per second",
      poder: 0,
      passivo: 1
    },

    {
      id: 3,
      nome: "roid rage",
      custo: 100,
      descriçao:"gera 2 tears per click",
     poder: 2,
     passivo: 0
    },

     { id: 4,
      nome: "mongo baby",
      custo: 100,
      descriçao:"gera 2 tears per second",
     poder: 0,
     passivo: 2
     },

    
  ]
  useEffect(() => {if (rendaPassiva === 0)  {return}

  const cronometro = setInterval(() => {
    setPontos((valorAtual)=> valorAtual + rendaPassiva)
  },1000)

  return () => clearInterval(cronometro)


  }, [rendaPassiva])

  return(
    //div main
    <div className="min-h-screen bg-yellow-800 flex flex-col md:flex-row text-white font-sans">
      {/*lado esquerdo da tela*/}
      <div className="flex-1 flex flex-col items-center justify-center p-10 border-yellow-800">
        <h2 className="text-2x1 text-yellow-600 font-bold tracking-widest lowercase mb-2">
      isaac
        </h2>
        
        <p className="text-6x1 font-black mb-12">
          {pontos} 
        </p>
           
      <div onClick={clicarNoBotao} className=" w-64 h-64 bg-yellow-700 rounded-full flex items-center justify-center text-5x1 cursor-pointer hover:scale-105 active:scale-95 transition-all">
       :0
      </div>

      </div>

      {/*lado direito*/}

      <div className="w-full md:w-96 bg-yellow-700 p-6 flex flex-col">
        <h2 className="text-2x1 font-bold mb-6 text-center border-b border-yellow-800 pb-4">
         items and trinkets
        </h2>
        {upgrades.map((item)=>(
        <div key={item.id} onClick={()=> comprarUpgrade(item.custo,item.poder,item.passivo)} className="bg-yellow-900 p-4 rounded-x1 flex justify-between items-center hover:bg-orange-800 cursor-pointer transition">
          <div>
          <h3 className="font-bold text-lg">{item.nome}</h3>
          <p className=" text-sm text-yellow-800">{item.descriçao}</p>

        </div>

        <div className="bg-yellow-700 px-4 py-2 rounded-lg font-bold text-yellow-800">
           {item.custo}
        </div>
      </div>
        ))}
      </div>
    </div>
  );
}