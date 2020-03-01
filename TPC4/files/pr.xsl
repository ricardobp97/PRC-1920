<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1 style="text-align:center">Project Record</h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <table width="100%">
            <tr>
                <td width="50%">
                    <p><b>Key Name: </b><xsl:value-of select="keyname"/></p>
                    <p><b>Title: </b><xsl:value-of select="title"/></p>
                    <p><b>Subtitle: </b><xsl:value-of select="subtitle"/></p>
                </td>
                <td>
                    <p><b>Begin Date: </b><xsl:value-of select="bdate"/></p>
                    <p><b>End Date: </b><xsl:value-of select="edate"/></p>
                    <p><b>Supervisor: </b><a href="{supervisor/homepage}"><xsl:value-of select="supervisor/name"/></a></p>
                </td>
            </tr>
        </table>
        <hr/>
    </xsl:template>
    
    <xsl:template match="workteam">
        <hr/>
        <h3>WorkTeam:</h3>
        <ol>
            <xsl:apply-templates/>
        </ol>
        <hr/>
    </xsl:template>
    
    <xsl:template match="member">
        <li>
            <p><xsl:value-of select="identifier"/> - <b><xsl:value-of select="name"/></b> - <a href="{email}"><xsl:value-of select="email"/></a> - <img src="{photo/@path}" alt="Photo" width="7%" align="middle" style="cursor: pointer" onclick="window.open('{photo/@path}','_blank');"/></p>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <hr/>
        <h2>Abstract:</h2>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <hr/>
        <h3>Deliverables:</h3>
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>