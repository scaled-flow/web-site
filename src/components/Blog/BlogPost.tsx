import React from "react";

import { Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Props {
  blogID: string;
}

const BlogPost: React.FC<Props> = ({ blogID }) => {
  const params = useParams();

  return (
    <>
      <Row>
        <Col>
          <h1>Headline</h1>
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate iusto possimus optio dicta assumenda
            voluptatum non, culpa odio reiciendis suscipit sit at impedit mollitia? Nesciunt veritatis labore odit
            tempore et? Eligendi officia sit vitae nesciunt repellendus, pariatur voluptates quos suscipit quae facilis
            voluptate provident ipsam, veritatis quam quod mollitia distinctio non enim illo. Fuga adipisci delectus
            dolorem saepe laboriosam vitae! Amet, quis beatae soluta, dicta sapiente error saepe fugiat praesentium unde
            velit nemo ab nulla ullam. Adipisci commodi distinctio, asperiores deleniti rerum recusandae corrupti,
            perferendis optio voluptatum, ullam natus quibusdam? Reprehenderit fuga obcaecati est odit quos cum hic esse
            fugit, id consectetur animi, ducimus exercitationem dolorum magnam in dicta? Eos, laudantium omnis obcaecati
            inventore facilis aliquid cum distinctio quibusdam quasi?
          </p>
        </Col>
        <Col>
          <Image src="http://www.fillmurray.com/500/500" fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Sub-Headline</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, incidunt voluptatibus officiis ipsam
            consequuntur modi quia. Ad asperiores aliquam similique quibusdam aut magnam, ratione vel non veniam
            possimus voluptatem fuga? Laborum perferendis quos natus iusto eos dicta odio explicabo hic dolorum at
            architecto vitae possimus blanditiis, rem reprehenderit minima consectetur deserunt nemo error facilis
            quibusdam! Quaerat sapiente asperiores obcaecati sit. Ipsum necessitatibus quisquam laborum, earum commodi
            aliquid quia laudantium soluta. Quibusdam optio nemo vero eos? Error pariatur quae dignissimos ut dolorem
            obcaecati, officia expedita quis iure. Atque consequatur iusto consectetur. Iure placeat quis illum esse
            quam amet nulla odio hic facere unde ipsa quo quod alias dolor eos dolorum, necessitatibus corrupti nisi
            provident et praesentium itaque eligendi! Doloribus, repudiandae veritatis. Quasi autem voluptas, ipsam
            totam molestias inventore ad vel provident error voluptatum! Id quo, velit ipsam, magni placeat quod
            deserunt labore eius corporis similique soluta a corrupti asperiores cumque tempora? Debitis earum quos
            aspernatur soluta architecto, quis voluptates perferendis voluptate id dignissimos sed animi molestias
            molestiae ad? Animi quia exercitationem officia voluptatibus dignissimos necessitatibus reiciendis, enim rem
            accusamus, corrupti ab? Esse accusantium praesentium suscipit culpa inventore non odit quasi nobis
            blanditiis similique quaerat repellat animi architecto, vel error quidem repudiandae. Nam quis incidunt
            tempora. Eaque, impedit! Esse magni incidunt repellat.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default BlogPost;
