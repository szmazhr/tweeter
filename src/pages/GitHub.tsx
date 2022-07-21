import { useEffect } from 'react';

function GitHub() {
  useEffect(() => {
    window.location.href = 'https://github.com/szmazhr';
  });
  return <div>Redirecting to https://github.com/szmazhr</div>;
}
export default GitHub;
