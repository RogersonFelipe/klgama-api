require("dotenv").config();
const supabase = require("./src/config/database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

async function seed() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...\n");

    // ============ LIMPAR DADOS EXISTENTES (opcional) ============
    // Descomente se quiser limpar e recriar do zero
    /*
    console.log('🗑️  Limpando dados existentes...');
    await supabase.from('demanda').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('usuario').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('cliente').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('✅ Dados limpos\n');
    */

    // ============ CRIAR CLIENTES ============
    console.log("📋 Criando clientes...");

    const clienteId1 = uuidv4();
    const clienteId2 = uuidv4();

    const { data: clientes, error: erroClientes } = await supabase
      .from("cliente")
      .insert([
        {
          id: clienteId1,
          nome: "Tech Solutions",
          ativo: true,
        },
        {
          id: clienteId2,
          nome: "Digital Agency",
          ativo: true,
        },
      ])
      .select();

    if (erroClientes) {
      console.error("❌ Erro ao criar clientes:", erroClientes.message);
      return;
    }

    console.log(`✅ ${clientes.length} clientes criados`);
    console.log(`   - ID 1: ${clienteId1}`);
    console.log(`   - ID 2: ${clienteId2}\n`);

    // ============ CRIAR USUÁRIOS ============
    console.log("👤 Criando usuários...");

    const senhaHash = await bcrypt.hash("senha123", 10);

    const { data: usuarios, error: erroUsuarios } = await supabase
      .from("usuario")
      .insert([
        {
          id: uuidv4(),
          nome: "Admin Tech",
          email: "admin@techsolutions.com",
          senha: senhaHash,
          ativo: true,
          is_adm: true,
          cliente_id: clienteId1,
        },
        {
          id: uuidv4(),
          nome: "João Developer",
          email: "joao@techsolutions.com",
          senha: senhaHash,
          ativo: true,
          is_adm: false,
          cliente_id: clienteId1,
        },
        {
          id: uuidv4(),
          nome: "Maria Designer",
          email: "maria@techsolutions.com",
          senha: senhaHash,
          ativo: true,
          is_adm: false,
          cliente_id: clienteId1,
        },
        {
          id: uuidv4(),
          nome: "Admin Agency",
          email: "admin@digitalagency.com",
          senha: senhaHash,
          ativo: true,
          is_adm: true,
          cliente_id: clienteId2,
        },
      ])
      .select();

    if (erroUsuarios) {
      console.error("❌ Erro ao criar usuários:", erroUsuarios.message);
      return;
    }

    console.log(`✅ ${usuarios.length} usuários criados`);
    usuarios.forEach((user) => {
      console.log(`   - ${user.nome} (${user.email})`);
    });
    console.log();

    // ============ CRIAR DEMANDAS ============
    console.log("📝 Criando demandas...");

    const usuarioId1 = usuarios[1].id; // João
    const usuarioId2 = usuarios[2].id; // Maria

    const { data: demandas, error: errodemandas } = await supabase
      .from("demanda")
      .insert([
        {
          id: uuidv4(),
          descr: "Implementar autenticação JWT",
          due_date: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 7 dias
          usuario_id: usuarioId1,
          cliente_id: clienteId1,
        },
        {
          id: uuidv4(),
          descr: "Criar interface de dashboard",
          due_date: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 14 dias
          usuario_id: usuarioId2,
          cliente_id: clienteId1,
        },
        {
          id: uuidv4(),
          descr: "Testes de segurança da API",
          due_date: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 3 dias
          usuario_id: usuarioId1,
          cliente_id: clienteId1,
        },
      ])
      .select();

    if (errodemandas) {
      console.error("❌ Erro ao criar demandas:", errodemandas.message);
      return;
    }

    console.log(`✅ ${demandas.length} demandas criadas\n`);

    // ============ RESUMO FINAL ============
    console.log("╔════════════════════════════════════════╗");
    console.log("║     ✅ SEED CONCLUÍDO COM SUCESSO!    ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("📌 DADOS DE TESTE:\n");
    console.log("Cliente 1: Tech Solutions");
    console.log(`  Email: admin@techsolutions.com`);
    console.log(`  Senha: senha123\n`);

    console.log("Cliente 2: Digital Agency");
    console.log(`  Email: admin@digitalagency.com`);
    console.log(`  Senha: senha123\n`);

    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro fatal:", erro);
    process.exit(1);
  }
}

seed();
