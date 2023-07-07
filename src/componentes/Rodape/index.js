import "./Rodape.css";

const Rodape = () => {
  return (
    <footer className="rodape-final">
      <div className="rodape-final__redes-sociais">
        <a href="https://www.google.com"><img src="/imagens/fb.png" alt="facebook" /></a>
        <a href="https://www.google.com"><img src="/imagens/tw.png" alt="twitter" /></a>
        <a href="https://www.google.com"><img src="/imagens/ig.png" alt="instagram" /></a>
      </div>
      <div className="rodape-final__logo">
        <img src="/imagens/logo.png" alt="logo"/>
      </div>
      <div className="rodape-final__texto">
        <h4>Desenvolvido por Erick</h4>
      </div>
    </footer>
  );
};

export default Rodape;
