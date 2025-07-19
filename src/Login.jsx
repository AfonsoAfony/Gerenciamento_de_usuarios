import InputLogin from './components/InputLogin'
import './Login.css'

function Login() {
    return(
        <div className="border-black-500 h-190 " id='body_login'>
                <div className='sections'> 
                <main id="container">
                <section className="row">
                    <div id="part1">
                                <h1 class="letra1 mt-10 ">GEST USER </h1>
                                <p class="letra2 mt-3 "> Sistema de gestão de usuários</p>
                                
                     </div>
                    <div id="part2">
                        <div id="div-formulario">
                            
                                <div id="formLogin">
                                <InputLogin/>
                                </div>

                        </div>
                    </div>

                </section>
                </main>
                </div>
        </div>
    )
}
export default Login