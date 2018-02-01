using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace crud_asp.Models
{

    public class SqlClass
    {
        SqlConnection con;

        public SqlClass()
        {
            con = new SqlConnection();
            con.ConnectionString = ConfigurationManager.ConnectionStrings["SQLConnection"].ConnectionString;
        }



        // wsKioskoP.ServiceClient myKioskoP = new wsKioskoP.ServiceClient();
        SqlDataAdapter da;
        public bool SqlConsulta(string consulta, ref DataTable dt)
        {


            dt.TableName = "temp";
            //return myKioskoP.SqlConsultaDT(consulta,ref dt);

            try
            {
                con.Open();
                da = new SqlDataAdapter(consulta, con);
                da.Fill(dt);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                //throw;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                }

            }


        }

        public int SqlConsulta(string consulta)
        {
            //return myKioskoP.SqlConsultaSRT(consulta);
            int rowAffected = 0;
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand(consulta, con);
                cmd.CommandType = CommandType.Text;
                rowAffected = cmd.ExecuteNonQuery();
                con.Close();
                return rowAffected;

            }
            catch (Exception ex)
            {
                return rowAffected;
                //throw;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                }

            }


        }



        public int storeProc(String StoreProcedureName, List<parametro> parametros)
        {
            //return myKioskoP.storeProc(StoreProcedureName, parametros.ToArray());
            int rowAffected = 0;
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand(StoreProcedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;
                for (int i = 0; i < parametros.Count; i++)
                {
                    cmd.Parameters.AddWithValue(parametros[i].nombre, parametros[i].valor);
                }
                rowAffected = cmd.ExecuteNonQuery();

            }
            catch (Exception)
            {

                //throw;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                }

            }
            return rowAffected;
        }

    }
    public class parametro
    {
        List<parametro> parametros = new List<parametro>();
        private String nombre_;
        public String nombre
        {
            get { return nombre_; }
            set { nombre_ = "@" + value; }
        }
        public String valor;

    }
}
