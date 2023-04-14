import nosotros from '../../../assets/nosotros/nosotros.png';
import valor1 from "../../../assets/home/valor1.png";

export const Nosotros = () => {
    return (
        <>
        <main>
            <section className="nosotros2">
                <div className="nosotros2__main">
                    <div className="nosotros2__main__title">
                        <h1>¿Quiènes <span>somos</span>?</h1>
                    </div>

                    <div className="nosotros2__main__info">
                        <p>Somos un Centro Radiológico Dental, el cual disponemos de alta tecnología y un equipo profesional altamente cualificado. Ubicados en el distrito de Los Olivos - Perú, nos comprometemos a facilitar un servicio diagnóstico oportuno a los profesionales de la salud dental y brindar una excelente atención a sus pacientes.</p>
                    </div>
                </div>
                <div className="nosotros2__img">
                    <picture>
                        <img src={nosotros} />
                    </picture>
                </div>
                
            </section>

            <section className="info">
                <div className="info__main">
                    <div className="info__main__gen">
                        <h2>Misión</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eos quis ullam ut est neque maxime explicabo amet iure esse consequatur, sapiente corrupti. Totam pariatur sequi voluptatum dolore placeat, sit alias est a, velit accusantium harum! Quos asperiores ad velit!</p>
                    </div>
                    <div className="info__main__gen">
                        <h2>Visión</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eos quis ullam ut est neque maxime explicabo amet iure esse consequatur, sapiente corrupti. Totam pariatur sequi voluptatum dolore placeat, sit alias est a, velit accusantium harum! Quos asperiores ad velit!</p>
                    </div>
                </div>
            </section>

            <section className="valores">
                <div className="valores__title">
                    <h2>Nuestros valores</h2>
                </div>
                <div className="valores__main">
                    <div className="valores__main__val">
                        <div className="valores__main__val__valor">
                            <img src={valor1} alt="" />
                            <h5>Respeto</h5>
                        </div>
                        <div className="valores__main__val__valor">
                            <img src={valor1} alt="" />
                            <h5>Respeto</h5>
                        </div>
                        <div className="valores__main__val__valor">
                            <img src={valor1} alt="" />
                            <h5>Respeto</h5>
                        </div>
                        <div className="valores__main__val__valor">
                            <img src={valor1} alt="" />
                            <h5>Respeto</h5>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}