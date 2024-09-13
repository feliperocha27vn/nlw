const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: "Tomar 3l de água por dia",
  checked: false
}

let metas = [meta]

async function cadastrarMeta() {
  const meta = await input({ message: "Digite a meta: " })
  //comparando o tamanho da meta
  if (meta.length == 0) {
    //caso a meta seja vazia console log é executado
    console.log("A meta não pode ser vazia")
    return
  }

  metas.push({ value: meta, checked: false })
}

async function listarMetas() {
  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false
  })

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada!")
    return
  }

  metas.forEach((m) =>{
    m.checked = false
  })

  respostas.forEach((resposta) =>{
    const meta = metas.find(m =>{
      return m.value == resposta
    })
    meta.checked = true;
  })
  console.log("Metas marcadas como conluídas!")
}

async function start() {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "cadastrar"
        },
        {
          name: "Listar Metas",
          value: "listar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMetas()
        break
      case "sair":
        console.log("Até a próxima!")
        return
    }
  }
}

start();