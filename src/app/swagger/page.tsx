
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage() {
  return (
    <section className="container">
       <SwaggerUI url="/api/swagger" />
    </section>
  );
}
