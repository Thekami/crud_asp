using System;
using System.Data;
using System.Web;

namespace crud_asp.Models
{
    public class persona
    {
        public string nombre;
        public string apellido;
        public int sexo;
        public int status;
        public DateTime fecha_nac;


        SqlClass miSqlClass;
        public persona[] read(String status)
        {

            DataTable dt = new DataTable();
            miSqlClass = new SqlClass();
            string consult;

            if (status == "2")
                consult = "SELECT [id] ,[nombre], [apellido], [fecha_nac], [sexo], [status] FROM[test].[dbo].[personas]";
            else
                consult = "SELECT [id] ,[nombre], [apellido], [fecha_nac], [sexo], [status] FROM[test].[dbo].[personas] WHERE [status] = " + status;

            miSqlClass.SqlConsulta(consult, ref dt);

            persona[] aPersonas = new persona[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aPersonas[i] = new persona()
                {
                    nombre = dt.Rows[i]["nombre"].ToString(),
                    apellido = dt.Rows[i]["apellido"].ToString(),
                    sexo = int.Parse(dt.Rows[i]["sexo"].ToString()),
                    status = int.Parse(dt.Rows[i]["status"].ToString()),
                    fecha_nac = DateTime.Parse(dt.Rows[i]["fecha_nac"].ToString())
                };

                //aPersonas[i] = new personas();
                //aPersonas[i].nombre = dt.Rows[i]["nombre"].ToString();

            }

            return aPersonas;
        }
    }

}
