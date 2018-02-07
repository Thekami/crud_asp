using System;
using System.Data;
using System.Web;

namespace crud_asp.Models
{
    public class persona
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public int sexo { get; set; }
        public int status { get; set; }
        public string fecha_nac { get; set; }


        SqlClass DBConnection;
        public persona[] read(String status)
        {

            DataTable dt = new DataTable();
            DBConnection = new SqlClass();
            string consult;

            if (status == "2")
                consult = "SELECT [id] , CONCAT([apellidos],' ',[nombres]) nombre, CAST([fecha_nac] AS date) fecha_nac, [sexo], [status] FROM[test].[dbo].[personas]";
            else
                consult = "SELECT [id] , CONCAT([apellidos],' ',[nombres]) nombre, CAST([fecha_nac] AS date) fecha_nac, [sexo], [status] FROM[test].[dbo].[personas] WHERE [status] = " + status;

            DBConnection.SqlConsulta(consult, ref dt);

            persona[] aPersonas = new persona[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aPersonas[i] = new persona()
                {
                    id = int.Parse(dt.Rows[i]["id"].ToString()),
                    nombre = dt.Rows[i]["nombre"].ToString(),
                    sexo = int.Parse(dt.Rows[i]["sexo"].ToString()),
                    status = int.Parse(dt.Rows[i]["status"].ToString()),
                    fecha_nac = (DateTime.Parse(dt.Rows[i]["fecha_nac"].ToString())).ToString("d")
                    //fecha_nac = dt.Rows[i]["fecha_nac"].ToString(),
                    //DateTime.parse('sdf')
                };

                //aPersonas[i] = new personas();
                //aPersonas[i].nombre = dt.Rows[i]["nombre"].ToString();

            }

            return aPersonas;
        }

        public persona[] get(String id)
        {

            DataTable dt = new DataTable();
            DBConnection = new SqlClass();
            string consult;

            consult = "SELECT [apellidos], [nombres], [fecha_nac], [sexo] FROM[test].[dbo].[personas] WHERE [id] = " + id;

            DBConnection.SqlConsulta(consult, ref dt);

            persona[] aPersonas = new persona[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aPersonas[i] = new persona()
                {
                    nombre = dt.Rows[i]["nombres"].ToString(),
                    apellido = dt.Rows[i]["apellidos"].ToString(),
                    sexo = int.Parse(dt.Rows[i]["sexo"].ToString()),
                    fecha_nac = (DateTime.Parse(dt.Rows[i]["fecha_nac"].ToString())).ToString("yyyy-MM-dd")
                };


            }

            return aPersonas;
        }

        public int add(persona persona)
        {
            DBConnection = new SqlClass();
            String consult = "INSERT INTO [dbo].[personas]([nombres],[apellidos],[sexo],[fecha_nac]) VALUES ('" + persona.nombre+"', '"+persona.apellido+"', "+persona.sexo+", '"+ persona.fecha_nac + "')";
            return DBConnection.SqlConsulta(consult);
            
        }

        public int update(persona persona)
        {
            DBConnection = new SqlClass();
            String consult = "UPDATE [dbo].[personas] SET [nombres] = '" + persona.nombre + "', [apellidos] = '" + persona.apellido + "', [sexo] = " + persona.sexo + ",[fecha_nac] = '" + persona.fecha_nac + "' WHERE id = "+persona.id;
            return DBConnection.SqlConsulta(consult);

        }

        public int delete(String id)
        {
            DBConnection = new SqlClass();
            String consult = "UPDATE [dbo].[personas] SET [status] = 0 WHERE [id] = " + id;
            return DBConnection.SqlConsulta(consult);
        }
    }

}
