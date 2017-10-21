<?xml version = "1.0" encoding = "UTF-8" ?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:s = "http://www.ineasysteps.com/xsd" >

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="s:doc">
  <html>
    <head>
      <title>XSL Output</title>
    </head>
  <body>
    <h2>Stock Report &gt; 70.00</h2>
    <table border="1" style= "width:20%;">
      <tr style="background-color:black; color:white; text align:center;">
        <th>Symbol</th>
        <th>Price</th>
        <th>CEO</th>
      </tr>
      <xsl:for-each select="s:item">
      <xsl:if test="s:price &gt; 70.00">

        <xsl:choose>
      <xsl:when test = "s:price &lt; 80.00">
      <tr style="background-color:lightgray;">
        <td ><xsl:value-of select="s:symbol"/></td>
        <td ><xsl:value-of select="s:price"/></td>
        <td><xsl:value-of select="s:ceo"/></td>
  	  </tr>
     </xsl:when>

     <xsl:otherwise>
      <tr style="background-color:cyan;">
         <td ><xsl:value-of select="s:symbol"/></td>
         <td ><xsl:value-of select="s:price"/></td>
         <td><xsl:value-of select="s:ceo"/></td>
   	  </tr>
     </xsl:otherwise>
      </xsl:choose>

      </xsl:if>
      </xsl:for-each>
      </table>
    </body>
    </html>
  </xsl:template>
  </xsl:stylesheet>
