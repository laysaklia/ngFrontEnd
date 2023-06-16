# Login Social com Angular e Firebase
O login social permite a autenticação do usuário no seu aplicativo usando as credenciais de um provedor federado conhecido como Google, Facebook, Microsoft, Github, etc.

#### Vantagens
 - Diminui a quantidade de código para autenticar usuários.
     - API já vem pronta.
 - Não precisa de ferramentas de confirmação de identidade.
 - Não tem custo para o site. 
 - Ameniza problemas com LGPD, políticas de privacidade e tratamento de dados pessoais.
#### Desvantagens
- O provedor envia somente dados públicos.
- Para dados mais completos, precisamos solicitar ao usuário.
- O aplicativo precisa ter SSL/HTTPS.
- É necessário ter uma conta de "desenvolvedor" no provedor federado.
- O aplicativo precisa ser aprovado pelo provedor federado, o que pode levar algum tempo.
- Alguns provedores não permitem o acesso pelo "http://localhost" para desenvolvimento e testes.

## Firebase
Ferramenta online do Google que oferece serviços de back-end como banco de dados, hospedagem e autenticação para aplicativos Web, mobile e jogos. A maioria dos serviços são pagos, mas alguns serviços básicos estão disponíveis em um *tier* gratuito.

Para usar o Firebase, logue-se no site da plataforma, pelo endereço https://firebase.com usando uma conta Google.

### Criando um back-end
Um back-end é um **Projeto do Firebase**, juntamente com um ou mais aplicativos que vão consumir este *back-end*.
 - Logue-se no Firebase → https://firebase.com usando uma conta Google.
 - Clique em "ir para o console" ou no botão [Começar].
 - Clique em "+ Adicionar projeto".
 - Dê um nome para o projeto.
     - Logo abaixo do nome, opcionalmente, é possível editar o subdomínio do projeto.
 - Clique em [Continuar].
 - Desmarque a opção "Ativar o Google Analytics neste projeto".
    - Não usaremos esta ferramenta ainda.
     - Se necessário, isso poderá ser reativado depois.
 - Clique em [Criar projeto] e aguarde...
 - Clique em [Continuar] para acessar a *Dashboard* do projeto.

### Criando um aplicativo
Um aplicativo do Firebase é um **end point** que vai conectar os serviços do back-end ao seu aplicativo *front-end*, por exemplo. Ele contém diversas chaves de validação e autorização que permite que seu aplicativo se conecte ao *back-end*.

- Em "Comece adicionando o Firebase ao seu aplicativo", clique em Web → `</>`.
- Digite um apelido para o aplicativo.
- Desmarque "Configure também o  Firebase Hosting  para este app.".
    - Não usaremos esta ferramenta ainda.
     - Se necessário, isso poderá ser reativado depois.
 - Clique em [Registrar app].
 - Ignore as configurações por enquanto e clique em [Continuar no console].

### Ferramenta de Autenticação
Esta é a ferramenta do Firebase que integra o *login social* ao nosso *front-end*. Inicialmente, usaremos somente a autenticação pelo próprio Google porque ela já estará previamente configurada. Para usar outros provedores ou outras formas de autenticação, é necessário se aprofundar mais na documentação da ferramenta. 

 - Clique em "Authentication" na tela principal ou em "Criação" → Authentication no menu lateral.
 - Na tela "Authentication", clique em [Vamos começar].
 - Na lista de "Provedores de login", clique em "Google".
 - Na "caixa" do Google, cheque o botão "Ativar".
 - Logo abaixo, clique na caixa "E-mail de suporte do projeto" e no seu e-mail.
 - Mais abaixo, clique no botão [Salvar].
 - Observe o status "Ativado" ao lago do Google.
 - Nesta mesma página, na guia "Users" podemos ver os usuários logados. Obviamente, a lista estará ainda vazia.

### Biblioteca AngularFire
Como vamos criar um *front-end* com *Angular* que é mantido pelo Google, a melhor forma de integrar o *front-end* ao *back-end* é usando a biblioteca de módulos **AngularFire**, também mantida pelo Google e pela mesma equipe que mantém o *Angular*. O repositório é https://github.com/angular/angularfire/.

 - Abra um *Node.js command prompt*.
    - Se o server do aplicativo Angular já está online em um *Node.js command prompt*, encerre-o e use o mesmo *Node.js command prompt*.
     - Se ainda não tem, crie um aplicativo *Angular* pelo *Node.js command prompt*, sem esquecer de acessar a pasta raiz do projeto pelo prompt.
 - o comando abaixo baixar os módulos da biblioteca para o projeto:
```
ng add @angular/fire
```

### Integrando
 - Volte à *Dashboard* do projeto no Firebase.com.
 - Na barra lateral, ao lado de "Visão geral do projeto", clique na engrenagem (⚙) → Configurações do projeto.
 - Role a tela até "Seus aplicativos" e neste "Configuração do SDK".
 - Selecione e copie o conteúdo entre as chaves da *constante* `const firebaseConfig =  {...}`.
     - Copie somente o conteúdo, dentro das chaves.
 - Retorne à IDE com o projeto aberto.
 - Abra o arquivo `src/environments/environment.ts` para edição.
 - Edite este arquivo para adicionar a chave "firebase: {}" à constante/objeto "environment". 
     - Esta chave conterá as configurações da chave obtida do Firebase.com. 
     - Caso já exista, outras chaves em `export  const environment =  {`, tenha cuidado para não alterá-las.
     - O arquivo deverá ter o seguinte formato:
 ```javascript
export const environment = {
    firebase: {
        projectId: '...',
        storageBucket: '...',
        apiKey: '...',
        authDomain: '...',
        messagingSenderId: '...',
        appId: '...'
    }
}
```
 - Salve e feche o arquivo.
 - Abra `src/app/app.module.ts` na IDE.
 - Importe os módulos da *AngularFire* que vamos usar:
```javascript
••• Outros imports foram omitidos. Não os altere.
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
••• Outros imports foram omitidos. Não os altere.
@NgModule({
  declarations: [
      ••• Não altere nada aqui.
  ],
  imports: [
    ••• Outros imports foram omitidos. Não os altere.
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [
      ••• Não altere nada aqui.
  ],
  bootstrap: [
      ••• Não altere nada aqui.  
  ]
})
export class AppModule { }
```
### Componente
 - Abra o componente inicial do aplicativo, normalmente `src/app/app.component.ts`  na IDE.
 - Abaixo está um código de exemplo. Estude-o!
```javascript
import { Component, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-theme',
  templateUrl: './admin-theme.component.html',
  styleUrls: ['./admin-theme.component.css']
})
export class AdminThemeComponent implements OnDestroy {

  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription = new Subscription;
  user: any;

  async ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe(
      (userData: User | null) => {
        if (userData) this.user = userData
      }
    )
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

}
```
### View
 - Abra o template inicial do aplicativo, por exemplo, `src/app/app.component.html` na IDE.
 - O trecho de código abaixo será inserido onde queremos ver o *Avatar* do usuário ou o link para que este faça login:
```
<span *ngIf="user; then userProfile else userLogin"></span>
```
- No final do mesmo documento, adicione os templates correspondentes ao usuário logado e não logado:
```javascript
<ng-template #userLogin>
    <a routerLink="/login" id="user" title="Perfil do usuário" routerLinkActive="active" ariaCurrentWhenActive="page">
        <i class="fa-solid fa-circle-user fa-fw"></i>
    </a>
</ng-template>
<ng-template #userProfile>
    <a routerLink="/user" id="user" title="Perfil do usuário" routerLinkActive="active" ariaCurrentWhenActive="page">
        <img src="{{user.photoURL}}" alt="Perfil de {{user.displayName}}" referrerpolicy="no-referrer">
    </a>
</ng-template>
``` 
- Basicamente, se não tem usuário logado, o template `#userLogin` será exibido, com o link para que se faça login, do contrário, `#userProfile` será exibido com o link para o perfil do usuário.

### Páginas do usuário
Será necessário adicionar os componentes para fazer login e para exibir o perfil do usuário:
 - Volte ao *Node.js command prompt* com a raiz do projeto aberta e crie os componentes:
```javascript
ng generate component login
•••
ng generate component profile
•••
```
 - Adicione as rotas para eles, editando `src/app/app-routing.module.ts`:
```javascript
••• Outros imports foram omitidos. Não os altere.
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
••• Outras chaves foram omitidas. Não as altere.
  { path: 'login', title: 'Faça login', component: LoginComponent },
  { path: 'profile', title: 'Perfil de usuário', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Página de login
O Firebase suporta duas interfaces (view) de autenticação para exibir a página de autorização ao usuário:
 - `signInWithPopup` → A página será aberta em um *popup* do navegador.
    - Alguns navegadores, por padrão, bloqueiam janelas *popup*.
    - Aplicativos hibridos não operam bem com autenticação via *popup*.
 - `signInWithRedirect` → A página será aberta no frame atual e após autorizado, retorna para a página do aplicativo.
     - Este formato às vezes falha no navegador e o usuário é levado a uma página de "erro 404".
     - Este é o formato mais recomendado para aplicativos mobile.
O código de exemplo, suporta ambos os modos, bastando (des)comentar conforme sua preferência.
```
src/login.component.ts
```
```javascript
import { Component, inject } from '@angular/core';
import { GoogleAuthProvider, Auth, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private auth: Auth = inject(Auth)
  ) { }

  login(provider: string) {

    signInWithPopup(this.auth, new GoogleAuthProvider())
    // signInWithRedirect(this.auth, this.providers[provider])
      .then((a) => {
        this.router.navigate(['/admin/home']);
      })
      .catch((error) => {
        console.error(error.code, error.message, error.customData.email);
        alert("Oooops! Ocorreram erros ao fazer login.");
      })
  }
}
```
```
login.component.html
```
```html
<h2>Login / Entrar</h2>
<p>Você precisa estar logado(a) para acessar os recursos do aplicativo.</p>
<p>
    <button (click)="login('google')">Entrar com o Google</button>
</p>
```
### Permitindo e bloqueando
Agora que o usuário pode se autenticar, podemos definir que rotas ele pode ou não pode acessar, conforme sua condição. Isso será feito em `src/app/app-routing.module.ts` usando `Auth-Guards`. Por exemplo:
 - Somente usuário logado pode acessar a rota `/profile` para ver seu perfil. Essa rota não é permitida para não logados.
 - Somente usuário não logado pode acessar a rota `/login`, que não é permitida para usuário logado.

Para  configurar isso, edite `src/app/app-routing.module.ts`:
```javascript
••• Outros imports foram omitidos. Não os altere.

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/login']);
const toHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  ••• Outras chaves foram omitidas. Não as altere.
  {
    path: 'login',
    title: 'Faça login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'profile',
    title: 'Perfil de usuário',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  ••• Outras chaves foram omitidas. Não as altere.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Repita as configurações para as rotas que deseja controlar o acesso.
