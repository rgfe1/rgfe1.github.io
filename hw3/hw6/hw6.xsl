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
    <table style= "width:30.5%; border-collapse: collapse">
      <tr style="background-color:black; color:white; text align:center;">
        <th style= "border: 1px black solid;">Symbol</th>
        <th style= "border: 1px black solid;">Price</th>
        <th style= "border: 1px black solid;">CEO</th>
      </tr>
      <xsl:for-each select="s:item">
      <xsl:if test="s:price &gt; 70.00">
      <xsl:variable name="oddEven">
        <xsl:choose>
      <xsl:when test="position() mod 2 = 0">cyan</xsl:when>
      <xsl:otherwise>lightgray</xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <tr style="background-color:{$oddEven}">
      <td style="border: 1px black solid;">
        <xsl:value-of select="s:symbol"/></td>
      <td style="border: 1px black solid;">
        <xsl:value-of select = "format-number(s:price,'$ #.00###')" />
        <xsl:value-of select="/s:price"/></td>
      <td style="border: 1px black solid;">
        <xsl:value-of select="s:ceo"/></td>
      </tr>
      </xsl:if>
      </xsl:for-each>
    </table>
    <div style= "background-color:black; color:white; width: 30%; padding: 3px; font-weight:bold">
      The total of stocks that cost more than $70.00 is
      <xsl:value-of select="count(/s:doc/s:item[s:price &gt; 70.00])"/>.
    </div>

  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
