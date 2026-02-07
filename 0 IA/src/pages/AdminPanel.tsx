import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'; 
import { gapi } from 'gapi-script'; 
import { GoogleLogin } from '@react-oauth/google'; 

interface MetricData {
  date: string;
  visitors: number;
}

function AdminPanel() {
  const [data, setData] = useState<MetricData[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const propertyId = import.meta.env.VITE_GA_PROPERTY_ID; // Agrega a .env: VITE_GA_PROPERTY_ID=properties/TU_PROPERTY_ID_NUMERICO (ej: properties/289123456)

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId,
        discoveryDocs: ['https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta'],
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
      }).then(() => {
        const auth = gapi.auth2.getAuthInstance();
        auth.isSignedIn.listen(setIsSignedIn);
        setIsSignedIn(auth.isSignedIn.get());
      });
    });
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

const fetchData = () => {
  gapi.client.analyticsdata.properties.runReport({
    property: propertyId,
    resource: {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
      dimensions: [{ name: 'date' }],
    },
  }).then((response: any) => {           // ← ya lo tenías o agrégalo
    const rows = (response.result.rows as any[]) || [];  // ← casteo explícito
    const chartData = rows.map((row: any) => ({          // ← aquí el fix principal
      date: row.dimensionValues?.[0]?.value || '',       // safe access con ?.
      visitors: Number(row.metricValues?.[0]?.value) || 0, // convierte a número
    }));
    setData(chartData);
  }).catch((err: unknown) => console.error('Error fetching GA data:', err));
};

  useEffect(() => {
    if (isSignedIn) fetchData();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div>
        <h1>Panel Admin</h1>
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login Failed')} />
      </div>
    );
  }

  return (
    <div>
      <h1>Métricas: Visitantes por Día (Últimos 7 días)</h1>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
      </LineChart>
      <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>Logout</button>
    </div>
  );
}

export default AdminPanel;