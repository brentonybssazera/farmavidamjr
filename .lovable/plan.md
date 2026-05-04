# Simplificar Checkout — remover e-mail e validações

## Objetivo
No `src/pages/Checkout.tsx`, remover totalmente o campo de **E-mail** e relaxar todas as validações para que qualquer texto digitado seja aceito (sem exigir CPF/CNPJ válido, formato, etc.).

## Mudanças em `src/pages/Checkout.tsx`

1. **Remover o campo de e-mail**
   - Remover o state `const [email, setEmail] = useState("")`.
   - Remover o `<div>` com `<Label htmlFor="email">` e o respectivo `<Input>`.
   - Ajustar o grid que hoje tem `email + phone` (`grid-cols-1 sm:grid-cols-2`) para mostrar apenas o telefone em coluna única.
   - No payload enviado para a edge function `create-pix-payment`, substituir `email: email.trim()` por um valor placeholder fixo (ex: `email: "cliente@checkout.local"`) para não quebrar o backend que provavelmente exige e-mail no gateway PIX.

2. **Remover validações estritas em `handlePlace`**
   - Remover as funções utilitárias de validação não usadas: `isRepeatedDigits`, `isValidCPF`, `isValidCNPJ`, `isValidBrazilianDocument` (mantendo apenas `onlyDigits`, ainda útil para limpar telefone/documento antes de enviar).
   - Remover o bloco que faz `toast.error("Preencha nome, e-mail e CPF/CNPJ")`.
   - Remover o bloco `if (!isValidBrazilianDocument(cleanDocument))`.
   - Remover o bloco `if (!shipAddress || !shipCity || !shipState)`.
   - Resultado: `handlePlace` chama direto `supabase.functions.invoke(...)` sem barrar nada — qualquer string nos campos é aceita.

3. **Texto de ajuda dos campos**
   - Remover/ajustar o placeholder "Somente números" do CPF/CNPJ (deixar livre).
   - Manter os labels visuais como estão (Nome, Telefone, CPF ou CNPJ, Endereço, Cidade, UF, Complemento) — só o e-mail sai.

## Não muda
- Nada de layout, estilo, responsividade mobile, fluxo PIX, status de pagamento, ou outros componentes.
- Edge functions `create-pix-payment` e `check-pix-status` permanecem intactas.

## Detalhes técnicos
Trecho final do form de "Seus dados" passa a ser:

```tsx
<div className="space-y-3">
  <div>
    <Label htmlFor="name" className="text-xs">Nome completo</Label>
    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg h-11 mt-1" />
  </div>
  <div>
    <Label htmlFor="phone" className="text-xs">Telefone</Label>
    <Input id="phone" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg h-11 mt-1" />
  </div>
  <div>
    <Label htmlFor="doc" className="text-xs">CPF ou CNPJ</Label>
    <Input id="doc" value={document} onChange={(e) => setDocument(e.target.value)} className="rounded-lg h-11 mt-1" />
  </div>
</div>
```

E `handlePlace` passa a iniciar direto em `setPlacing(true)` sem checagens.
