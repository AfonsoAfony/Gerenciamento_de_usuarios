import InputLogin from './components/InputLogin'
import './Login.css'

function Login() {
    return(
        <div className='sections'> 
        <main id="container">
        <section className="row">
            <div id="part1">
                
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
    )
}
export default Login